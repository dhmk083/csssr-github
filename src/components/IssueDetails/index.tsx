import React from "react";
import { Issue, PageState } from "types";
import issueDetails from "api/issueDetails";
import styles from "./styles.module.scss";
import Pager from "components/Pager";
import PageSizeSelector from "components/PageSizeSelector";
import IssueComment from "components/IssueComment";
import Row from "components/Row";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";

type Props = {
  owner: string;
  repo: string;
  id: number;
  isLoading: boolean;
  data?: Issue;
  error?: Error;
  pager: PageState;
  issueDetails(...args: Parameters<typeof issueDetails>);
};

export default function IssueDetails({
  owner,
  repo,
  id,
  isLoading,
  data,
  error,
  pager,
  issueDetails,
}: Props) {
  const [page, setPage] = React.useState(pager.page);
  const [perPage, setPerPage] = React.useState(pager.perPage);

  React.useEffect(() => {
    issueDetails({ owner, repo, id, page, perPage });
  }, [issueDetails, owner, repo, id, page, perPage]);

  React.useEffect(() => {
    if (page > 1 && data?.comments.length === 0) {
      setPage(page - 1);
    }

    // Из-за того, что гитхаб не возвращает общее кол-во комментов, используем данный хак.
    // Если в ответ пришел пустой массив, откатываемся на предыдущую страницу.
    // Эффект должен запускаться только при изменении ответа (data), а не страницы (page),
    // поэтому оставляем только data в зависимостях.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const totalPages = (data?.comments.length ?? 0) < perPage ? page : page + 1;

  return (
    <div>
      {isLoading && <Spinner>Загрузка...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {data && (
        <div>
          <h2 className={styles.title}>{data.issue.title}</h2>

          <div className={styles.items}>
            {page === 1 && (
              <IssueComment
                user={data.issue.user}
                date={new Date(data.issue.created_at)}
              >
                {data.issue.body}
              </IssueComment>
            )}

            {data.comments.map((x) => (
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
            <Pager
              page={pager.page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </Row>

          <Row>
            <PageSizeSelector value={pager.perPage} onChange={setPerPage} />
          </Row>
        </div>
      )}
    </div>
  );
}
