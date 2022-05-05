import React from "react";
import { usePromise, useIsDisposed } from "@dhmk/react";
import _listIssues from "api/listIssues";
import { ListIssuesResponse } from "types";
import { useParams } from "react-router-dom";
import IssuesList from "components/IssuesList";

export default function IssuesListContainer({
  listIssuesService = _listIssues,
}) {
  const { owner = "", repo = "" } = useParams();

  const [pager, setPager] = React.useState({
    page: 1,
    perPage: 30,
  });

  const [{ isPending, value, error }, capture] =
    usePromise<ListIssuesResponse>();

  const isDisposed = useIsDisposed();

  const listIssues = React.useCallback(
    ({ owner, repo, page, perPage }) => {
      capture(listIssuesService({ owner, repo, page, perPage })).then(() => {
        !isDisposed.current && setPager({ page, perPage });
      });
    },
    [capture, listIssuesService, isDisposed]
  );

  return (
    <IssuesList
      owner={owner}
      repo={repo}
      isLoading={isPending}
      data={value}
      error={error}
      pager={pager}
      listIssues={listIssues}
    />
  );
}
