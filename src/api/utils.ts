export const get = (url: string) =>
  fetch("https://api.github.com" + url, {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
  }).then(
    (r) => {
      if (!r.ok) {
        const msg = (() => {
          switch (r.status) {
            case 403:
              return "Превышен лимит запросов к API. Повторите запрос позже.";
            default:
              return "Ошибка запроса.";
          }
        })();

        return Promise.reject(new Error(msg));
      } else return r.json();
    },
    () => Promise.reject(new Error("Ошибка запроса"))
  );
