import React from "react";
import { useInput, usePromise } from "@dhmk/react";
import { debounced } from "@dhmk/utils";
import _search from "api/search";
import { SearchResponse } from "types";
import styles from "./styles.module.scss";

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
      <input {...input} />

      {isPending && <p>Поиск...</p>}

      {error && <p>Ошибка: {error.message}</p>}

      {value?.total_count === 0 && <p>Ничего не найдено :(</p>}

      {value?.items.map((x) => (
        <div key={x.id}>
          <p>{x.full_name}</p>
          <p>{x.description}</p>
        </div>
      ))}
    </div>
  );
}
