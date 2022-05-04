import React from "react";
import { useInput, usePromise } from "@dhmk/react";
import styles from "./styles.module.scss";

export default function Search() {
  const input = useInput();
  const [{ isPending, value, error }, capture] = usePromise<any>();

  const search = () => {
    if (!input.value) return;

    capture(
      fetch(
        "https://api.github.com/search/issues?" +
          new URLSearchParams({
            q: "is:issue repo:" + input.value,
          }),
        {
          headers: {
            accept: "application/vnd.github.v3+json",
          },
        }
      ).then(
        (r) => {
          if (!r.ok) {
            const msg = (() => {
              switch (r.status) {
                case 403:
                  return "Превышен лимит запросов к API. Повторите запрос позже.";
                case 422:
                  return "Ошибка запроса. Возможно, репозиторий не существует.";
              }
            })();

            return Promise.reject(new Error(msg));
          } else return r.json();
        },
        () => Promise.reject(new Error("Ошибка запроса"))
      )
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.searchBox}>
        <input {...input} />
        <button onClick={search}>Поиск</button>
      </div>

      {isPending && <p>Поиск...</p>}

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
        </div>
      )}
    </div>
  );
}
