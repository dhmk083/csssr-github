import React from "react";
import { useInput } from "@dhmk/react";
import { debounced } from "@dhmk/utils";
import { SearchResponse } from "types";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import ErrorBox from "components/ErrorBox";
import Spinner from "components/Spinner";

type Props = {
  isLoading: boolean;
  data?: SearchResponse;
  error?: Error;
  search(text: string);
};

export default function Search({ isLoading, data, error, search }: Props) {
  const input = useInput();

  const debouncedSearch = React.useMemo(() => debounced(search, 300), [search]);

  React.useEffect(() => {
    if (!input.value) return;
    debouncedSearch(input.value);
  }, [debouncedSearch, input.value]);

  return (
    <div className={styles.wrap}>
      <input {...input} className={styles.input} aria-label="Поиск" />

      {isLoading && <Spinner>Поиск...</Spinner>}

      {error && <ErrorBox>Ошибка: {error.message}</ErrorBox>}

      {data?.total_count === 0 && <div>Ничего не найдено :(</div>}

      {data && (
        <div className={styles.items}>
          {data.items.map((x) => (
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
