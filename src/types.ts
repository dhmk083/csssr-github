import _ListIssuesResponse from "api/fixtures/listIssues.json";
import _SearchResponse from "api/fixtures/search.json";
import _IssueResponse from "api/fixtures/issue.json";
import _IssueCommentsResponse from "api/fixtures/issueComments.json";

export type ListIssuesResponse = typeof _ListIssuesResponse;
export type SearchResponse = typeof _SearchResponse;
export type IssueResponse = typeof _IssueResponse;
export type IssueCommentsResponse = typeof _IssueCommentsResponse;

export type Issue = {
  issue: IssueResponse;
  comments: IssueCommentsResponse;
};

export type PageState = {
  page: number;
  perPage: number;
};
