import { SearchResponse } from "types";
import { get } from "./utils";

const search = (text: string) => {
  const slash = text.indexOf("/");
  const owner = slash === -1 ? "" : text.slice(0, slash);
  const repo = slash === -1 ? text : text.slice(slash);

  return get(
    "/search/repositories?" +
      new URLSearchParams({
        q: `${repo} ${owner ? "user:" + owner : ""}`,
      })
  ) as Promise<SearchResponse>;
};

export default search;
