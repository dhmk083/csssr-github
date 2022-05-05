import React from "react";
import { usePromise } from "@dhmk/react";
import _search from "api/search";
import { SearchResponse } from "types";
import Search from "components/Search";

export default function SearchContainer({ searchService = _search }) {
  const [{ isPending, value, error }, capture] = usePromise<SearchResponse>();

  const search = React.useCallback(
    (text) => capture(searchService(text)),
    [capture, searchService]
  );

  return (
    <Search isLoading={isPending} data={value} error={error} search={search} />
  );
}
