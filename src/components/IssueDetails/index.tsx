import React from "react";
import { usePromise } from "@dhmk/react";
import { Issue } from "types";
import issueDetails from "api/issueDetails";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import Pager from "components/Pager";
import PageSizeSelector from "components/PageSizeSelector";
import IssueComment from "components/IssueComment";
import Row from "components/Row";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";

export default function IssueDetails() {
  const { owner = "", repo = "", issueId = "" } = useParams();
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(30);
  const [{ isPending, value, error }, capture] = usePromise<Issue>();

  React.useEffect(() => {
    if (page > 1 && value?.comments.length === 0) {
      setPage(page - 1);
    }

    // Из-за того, что гитхаб не возвращает общее кол-во комментов, используем данный хак.
    // Если в ответ пришел пустой массив, откатываемся на предыдущую страницу.
    // Эффект должен запускаться только при изменении ответа (value), а не страницы (page),
    // поэтому оставляем только value в зависимостях.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    capture(issueDetails({ owner, repo, id: +issueId, page, perPage }));
  }, [capture, owner, repo, issueId, page, perPage]);

  const totalPages = (value?.comments.length ?? 0) < perPage ? page : page + 1;

  return (
    <div>
      {isPending && <Spinner>Загрузка...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {value && (
        <div>
          <h2 className={styles.title}>{value.issue.title}</h2>

          <div className={styles.items}>
            {page === 1 && (
              <IssueComment
                user={value.issue.user}
                date={new Date(value.issue.created_at)}
              >
                {value.issue.body}
              </IssueComment>
            )}

            {value.comments.map((x) => (
              <IssueComment
                key={x.id}
                user={x.user}
                date={new Date(x.created_at)}
              >
                {x.body}
              </IssueComment>
            ))}
          </div>

          <Row>
            <Pager page={page} totalPages={totalPages} onChange={setPage} />
          </Row>

          <Row>
            <PageSizeSelector value={perPage} onChange={setPerPage} />
          </Row>
        </div>
      )}
    </div>
  );
}
