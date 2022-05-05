import { render } from "@testing-library/react";
import IssueDetails from "./IssueDetails";

test("IssueDetails container", async () => {
  const spy = jest.fn(() => Promise.resolve<any>(1));
  render(<IssueDetails issueDetailsService={spy} />);
  expect(spy).toBeCalledWith({
    owner: "",
    repo: "",
    id: 0,
    page: 1,
    perPage: 30,
  });
});
