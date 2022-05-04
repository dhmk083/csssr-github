import { ListIssuesResponse } from "types";
import { get } from "./utils";

type Args = {
  owner: string;
  repo: string;
  page?: number;
  perPage?: number;
};

const listIssues = ({ owner, repo, page = 1, perPage = 30 }: Args) =>
  get(
    "/search/issues?" +
      new URLSearchParams({
        q: "is:issue repo:" + owner + "/" + repo,
        page: page.toString(),
        per_page: perPage.toString(),
      })
  ) as Promise<ListIssuesResponse>;

export default listIssues;
