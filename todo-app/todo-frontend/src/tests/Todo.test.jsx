import React from "react";
import "@testing-library/jest-dom"; // Add this line
import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

test("renders the Todo component correctly", () => {
  const todo = { text: "Test Todo", done: true };
  render(<Todo todo={todo} />);

  expect(screen.getByTestId("todo")).toBeInTheDocument();
  expect(screen.getByText("Test Todo")).toBeInTheDocument();
});
