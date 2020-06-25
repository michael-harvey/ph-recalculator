import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByText } = render(<App />);
  expect(getByText("pH Recalculator")).toBeInTheDocument();
});

test("displays expected total ph from values", () => {
  const { getByLabelText, queryByTestId } = render(<App />);

  fireEvent.change(getByLabelText(/ph/i), {
    target: { value: "8.1" },
  });

  fireEvent.change(getByLabelText(/salinity/i), {
    target: { value: "35" },
  });

  fireEvent.change(getByLabelText(/temperature/i), {
    target: { value: "18" },
  });

  expect(queryByTestId("ionic-strength")).toHaveTextContent(
    "0.7227631953981292"
  );
  expect(queryByTestId("so4-total")).toHaveTextContent("0.028235434132860126");
  expect(queryByTestId("potassium-bisulfate")).toHaveTextContent(
    "0.027377471695080157"
  );
  expect(queryByTestId("total-ph")).toHaveTextContent("7.975298869024447");
});

// TODO: test removal of fields
// TODO: test ph values based on field inputs
