import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./";

jest.useFakeTimers();

test("Search", async () => {
  const spy = jest.fn();
  render(<Search isLoading search={spy} />);
  fireEvent.change(screen.getByLabelText("Поиск"), {
    target: { value: "abc" },
  });
  jest.advanceTimersByTime(500);
  expect(spy).toBeCalledWith("abc");
  expect(screen.getByText("Поиск...")).toBeInTheDocument();
});
