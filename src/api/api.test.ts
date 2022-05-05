import search from "./search";
import listIssues from "./listIssues";
import issueDetails from "./issueDetails";
import searchData from "./fixtures/search.json";
import listIssuesData from "./fixtures/listIssues.json";
import issueDetailsData from "./fixtures/issue.json";
import issueDetailsComments from "./fixtures/issueComments.json";

test("search", async () => {
  global.fetch = jest.fn(async () => new Response(undefined, { status: 403 }));
  await expect(search("abc")).rejects.toThrow(/Превышен лимит/);

  global.fetch = jest.fn(async () => new Response(undefined, { status: 400 }));
  await expect(search("abc")).rejects.toThrow(/Ошибка запроса/);

  global.fetch = jest.fn(async () => new Response(JSON.stringify(searchData)));
  await expect(search("abc")).resolves.toEqual(searchData);
});

test("listIssues", async () => {
  global.fetch = jest.fn(async () => new Response(undefined, { status: 403 }));
  await expect(listIssues({ owner: "", repo: "" })).rejects.toThrow(
    /Превышен лимит/
  );

  global.fetch = jest.fn(async () => new Response(undefined, { status: 400 }));
  await expect(listIssues({ owner: "", repo: "" })).rejects.toThrow(
    /Ошибка запроса/
  );

  global.fetch = jest.fn(
    async () => new Response(JSON.stringify(listIssuesData))
  );
  await expect(listIssues({ owner: "", repo: "" })).resolves.toEqual(
    listIssuesData
  );
});

test("issueDetails", async () => {
  global.fetch = jest.fn(async () => new Response(undefined, { status: 403 }));
  await expect(issueDetails({ owner: "", repo: "", id: 0 })).rejects.toThrow(
    /Превышен лимит/
  );

  global.fetch = jest.fn(async () => new Response(undefined, { status: 400 }));
  await expect(issueDetails({ owner: "", repo: "", id: 0 })).rejects.toThrow(
    /Ошибка запроса/
  );

  global.fetch = jest.fn(
    async (url: any) =>
      new Response(
        JSON.stringify(
          url.includes("comments") ? issueDetailsComments : issueDetailsData
        )
      )
  );
  await expect(issueDetails({ owner: "", repo: "", id: 0 })).resolves.toEqual({
    issue: issueDetailsData,
    comments: issueDetailsComments,
  });
});
