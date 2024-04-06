import AppFunctional from "./AppFunctional"
import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import server from '../../backend/mock-server'

//Test that the visible texts in headings, buttons, links... render on the screen.
//Test that typing on the input results in its value changing to the entered text.

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

describe("App Functional Component", () => {
  
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  let header, coordinatesHeading, movesHeading, buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive, input, steps, index, submitBtn;
  let user;

  beforeEach(() => {
    render(<AppFunctional />);

    user = userEvent.setup();

      header = screen.getByText("Welcome to the GRID"); 
      coordinatesHeading = screen.getByText(`Coordinates ${index}`);
      movesHeading = screen.getByText(`You moved ${steps} times`);
      buttonOne = screen.getByTestId("LEFT");
      buttonTwo = screen.getByTestId("UP");
      buttonThree = screen.getByTestId("DOWN");
      buttonFour = screen.getByTestId("RIGHT");
      buttonFive = screen.getByTestId("reset");
      input = screen.getByPlaceHolderText("type email");
      submitBtn = screen.getByTestId("submitBtn")
  });

  test("all texts are visible", async () => {
    expect(header).toBeVisible();
    expect(coordinatesHeading).toBeVisible();
    expect(movesHeading).toBeVisible();
    expect(buttonOne).toBeVisible();
    expect(buttonTwo).toBeVisible();
    expect(buttonThree).toBeVisible();
    expect(buttonFour).toBeVisible();
    expect(buttonFive).toBeVisible();
  });

  test("can type in email, amd submit it", async () => {
    await user.type(input, "email");
    await user.click("submitBtn")
  });
});
