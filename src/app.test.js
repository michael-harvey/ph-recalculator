import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByText } = render(<App />);
  expect(getByText("pH Recalculator")).toBeInTheDocument();
});

test("displays expected total ph from values", () => {
  const { getByLabelText, queryByTestId } = render(<App />);

  fireEvent.change(getByLabelText(/ph/i), {
    target: { value: "7.9" },
  });

  fireEvent.change(getByLabelText(/salinity/i), {
    target: { value: "33" },
  });

  fireEvent.change(getByLabelText(/temperature/i), {
    target: { value: "20" },
  });

  expect(queryByTestId("ionic-strength")).toHaveTextContent("0.680");
  expect(queryByTestId("so4-total")).toHaveTextContent("0.027");
  expect(queryByTestId("potassium-bisulfate")).toHaveTextContent("0.025");
  expect(queryByTestId("total-ph")).toHaveTextContent("7.877");
});

test("adds and removes additional fields", () => {
  const { getByText, getAllByTestId } = render(<App />);

  expect(getByText("Remove field group")).toBeDisabled();

  fireEvent.click(getByText("Add field group"));

  expect(getByText("Remove field group")).not.toBeDisabled();

  expect(getAllByTestId("field-group")).toHaveLength(2);

  fireEvent.click(getByText("Remove field group"));

  expect(getAllByTestId("field-group")).toHaveLength(1);
});
