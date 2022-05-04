import React from "react";
import { useInput, usePromise } from "@dhmk/react";
import { debounced } from "@dhmk/utils";
import _search from "api/search";
import { SearchResponse } from "types";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";

const search = debounced(_search, 300);

export default function Search() {
  const input = useInput();
  const [{ isPending, value, error }, capture] = usePromise<SearchResponse>();

  React.useEffect(() => {
    if (!input.value) return;
    capture(search(input.value));
  }, [capture, input.value]);

  return (
    <div className={styles.wrap}>
      <input {...input} className={styles.input} />

      {isPending && <Spinner>Поиск...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {value?.total_count === 0 && <div>Ничего не найдено :(</div>}

      {value && (
        <div className={styles.items}>
          {value.items.map((x) => (
            <div key={x.id}>
              <p>
                <Link to={`/${x.owner.login}/${x.name}/issues`}>
                  {x.full_name}
                </Link>
              </p>
              <p>{x.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
