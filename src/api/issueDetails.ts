import { Issue } from "types";
import { get } from "./utils";

type Args = {
  owner: string;
  repo: string;
  id: number;
  page?: number;
  perPage?: number;
};

const issueDetails = async ({
  owner,
  repo,
  id,
  page = 1,
  perPage = 30,
}: Args) => {
  const [issue, comments] = await Promise.all([
    get(`/repos/${owner}/${repo}/issues/${id}`),
    get(
      `/repos/${owner}/${repo}/issues/${id}/comments?` +
        new URLSearchParams({
          page: page.toString(),
          per_page: perPage.toString(),
        })
    ),
  ]);

  return { issue, comments } as Issue;
};

export default issueDetails;
