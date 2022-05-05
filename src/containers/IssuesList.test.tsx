import { render } from "@testing-library/react";
import IssuesList from "./IssuesList";

test("IssuesList container", async () => {
  const spy = jest.fn(() => Promise.resolve<any>(1));
  render(<IssuesList listIssuesService={spy} />);
  expect(spy).toBeCalledWith({ owner: "", repo: "", page: 1, perPage: 30 });
});
