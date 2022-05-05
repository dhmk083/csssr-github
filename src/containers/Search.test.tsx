import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

jest.useFakeTimers();

test("Search container", async () => {
  const spy = jest.fn();
  render(<Search searchService={spy} />);
  fireEvent.change(screen.getByLabelText("Поиск"), {
    target: { value: "abc" },
  });
  jest.advanceTimersByTime(500);
  expect(spy).toBeCalledWith("abc");
});
