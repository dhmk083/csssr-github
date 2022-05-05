import React from "react";
import { useSelector, useDispatch } from "variants/redux";
import searchApi from "variants/redux/search";
import Search from "components/Search";

export default function SearchContainer() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector(searchApi.select());

  const search = React.useCallback(
    (text) => dispatch(searchApi.search(text)),
    [dispatch]
  );

  return (
    <Search isLoading={isLoading} data={data} error={error} search={search} />
  );
}
