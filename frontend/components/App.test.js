import AppFunctional from "./AppFunctional";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";

//Test that the visible texts in headings, buttons, links... render on the screen.
//Test that typing on the input results in its value changing to the entered text.

// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

describe("App Functional Component", () => {
  let server;

  beforeAll(() => {
    server = setupServer();
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  // header,
    let
    coordinatesHeading,
    movesHeading,
    buttonLeft,
    buttonRight,
    buttonUp,
    buttonDown,
    buttonReset,
    input,
    submitBtn,
    user;

  beforeEach(() => {
    render(<AppFunctional />);
    screen.debug();

    user = userEvent.setup();

    // header = screen.getByText(/welcome to the.*grid/i);
    coordinatesHeading = screen.getByText(/Coordinates/);
    movesHeading = screen.getByText(/You moved/);
    buttonLeft = screen.getByTestId("LEFT");
    buttonUp = screen.getByTestId("UP");
    buttonDown = screen.getByTestId("DOWN");
    buttonRight = screen.getByTestId("RIGHT");
    buttonReset = screen.getByTestId("reset");
    input = screen.getByPlaceHolderText("type email");
    submitBtn = screen.getByTestId("Submit");
  });

  test("all texts are visible", async () => {
    // expect(header).toBeInTheDocument();
    expect(coordinatesHeading).toBeVisible();
    expect(movesHeading).toBeVisible();
    expect(buttonLeft).toBeVisible();
    expect(buttonRight).toBeVisible();
    expect(buttonDown).toBeVisible();
    expect(buttonUp).toBeVisible();
    expect(buttonReset).toBeVisible();
    expect(submitBtn).toBeVisible();
  });

  test("Input acquires the correct value when typed on", async () => {
    await user.type(input, "example@email.com");
    expect(input).toHaveValue("example@email.com");
  });
});
