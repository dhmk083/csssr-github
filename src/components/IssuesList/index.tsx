import React from "react";
import Pager from "components/Pager";
import PageSizeSelector from "components/PageSizeSelector";
import styles from "./styles.module.scss";
import { ListIssuesResponse, PageState } from "types";
import { Link } from "react-router-dom";
import Row from "components/Row";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";
import listIssues from "api/listIssues";

type Props = {
  owner: string;
  repo: string;
  isLoading: boolean;
  data?: ListIssuesResponse;
  error?: Error;
  pager: PageState;
  listIssues(...args: Parameters<typeof listIssues>);
};

export default function IssuesList({
  owner,
  repo,
  isLoading,
  data,
  error,
  pager,
  listIssues,
}: Props) {
  const [page, setPage] = React.useState(pager.page);
  const [perPage, setPerPage] = React.useState(pager.perPage);

  React.useEffect(() => {
    listIssues({ owner, repo, page, perPage });
  }, [listIssues, owner, repo, page, perPage]);

  const totalPages = Math.ceil(data?.total_count ?? 0 / page);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        {owner}/{repo}
      </h2>

      {isLoading && <Spinner>Загрузка...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {data?.total_count === 0 && <div>Нет обращений</div>}

      {data && (
        <div className={styles.items}>
          {data.items.map((x) => (
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
