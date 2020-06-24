import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByText } = render(<App />);
  expect(getByText("pH Recalculator")).toBeInTheDocument();
});

test("adds additional fields", () => {
  render(<App />);

  fireEvent.click(screen.getByText("Add field group"));
  expect();
  // TODO: test for two sets of fields
});

// TODO: test removal of fields
// TODO: test ph values based on field inputs
