import React from "react";
import { usePromise } from "@dhmk/react";
import Pager from "components/Pager";
import PageSizeSelector from "components/PageSizeSelector";
import styles from "./styles.module.scss";
import listIssues from "api/listIssues";
import { ListIssuesResponse } from "types";
import { Link, useParams } from "react-router-dom";
import Row from "components/Row";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";

export default function IssuesList() {
  const { owner = "", repo = "" } = useParams();

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(30);
  const [{ isPending, value, error }, capture] =
    usePromise<ListIssuesResponse>();

  React.useEffect(() => {
    capture(listIssues({ owner, repo, page, perPage }));
  }, [capture, owner, repo, page, perPage]);

  const totalPages = Math.ceil(value?.total_count ?? 0 / page);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        {owner}/{repo}
      </h2>

      {isPending && <Spinner>Загрузка...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {value?.total_count === 0 && <div>Нет обращений</div>}

      {value && (
        <div className={styles.items}>
          {value.items.map((x) => (
            <div key={x.id} className={styles.issue}>
              <Card>
                <Card.Header>
                  <div className={styles.issueTitle}>
                    <Link to={`/${owner}/${repo}/issues/${x.number}`}>
                      {x.title}{" "}
                    </Link>
                  </div>
                </Card.Header>

                <div className={styles.issueBody}>
                  <div>#{x.number}</div>
                  <div>{x.user.login}</div>
                  <div>{new Date(x.created_at).toLocaleString()}</div>
                </div>
              </Card>
            </div>
          ))}

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
