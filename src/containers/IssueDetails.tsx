import React from "react";
import { useIsDisposed, usePromise } from "@dhmk/react";
import { Issue } from "types";
import _issueDetails from "api/issueDetails";
import { useParams } from "react-router-dom";
import IssueDetails from "components/IssueDetails";

export default function IssueDetailsContainer({
  issueDetailsService = _issueDetails,
}) {
  const { owner = "", repo = "", issueId = "" } = useParams();

  const [pager, setPager] = React.useState({ page: 1, perPage: 30 });

  const [{ isPending, value, error }, capture] = usePromise<Issue>();

  const isDisposed = useIsDisposed();

  const issueDetails = React.useCallback(
    ({ owner, repo, id, page, perPage }) => {
      capture(issueDetailsService({ owner, repo, id, page, perPage })).then(
        () => {
          !isDisposed.current && setPager({ page, perPage });
        }
      );
    },
    [capture, issueDetailsService, isDisposed]
  );

  return (
    <IssueDetails
      owner={owner}
      repo={repo}
      id={+issueId}
      isLoading={isPending}
      data={value}
      error={error}
      pager={pager}
      issueDetails={issueDetails}
    />
  );
}
