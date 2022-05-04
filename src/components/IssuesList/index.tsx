import React from "react";
import { usePromise } from "@dhmk/react";
import Pager from "components/Pager";
import PageSizeSelector from "components/PageSizeSelector";
import styles from "./styles.module.scss";
import listIssues from "api/listIssues";
import { ListIssuesResponse } from "types";
import { useParams } from "react-router-dom";

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
      <div>
        Репозиторий: {owner}/{repo}
      </div>

      {isPending && <p>Загрузка...</p>}

      {error && <p>Ошибка: {error.message}</p>}

      {value?.total_count === 0 && <p>Нет обращений</p>}

      {value && (
        <div className={styles.items}>
          {value.items.map((x) => (
            <div key={x.id} className={styles.issue}>
              <div className={styles.number}>#{x.number}</div>
              <div className={styles.title}>{x.title}</div>
              <div className={styles.date}>
                {new Date(x.created_at).toLocaleString()}
              </div>
            </div>
          ))}
          <Pager page={page} totalPages={totalPages} onChange={setPage} />
          <PageSizeSelector value={perPage} onChange={setPerPage} />
        </div>
      )}
    </div>
  );
}
