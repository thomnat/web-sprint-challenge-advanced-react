import AppFunctional from "./AppFunctional"
import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";

//Test that the visible texts in headings, buttons, links... render on the screen.
//Test that typing on the input results in its value changing to the entered text.

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

describe("App Functional Component", () => {
  let header, coordinatesHeading, movesHeading, buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive, input, moves, user, activeSquare;

  beforeEach(async () => {
    render(<AppFunctional />);
    user = userEvent.setup();
    await waitFor(() => {
      header = screen.getByText("Welcome to the GRID"); 
      coordinatesHeading = screen.getByText(`Coordinates ${activeSquare}`);
      movesHeading = screen.getByText(`You moved ${moves} times`);
      buttonOne = screen.getByText("LEFT");
      buttonTwo = screen.getByText("UP");
      buttonThree = screen.getByText("DOWN");
      buttonFour = screen.getByText("RIGHT");
      buttonFive = screen.getByText("reset");
      input = screen.getByPlaceHolderText("type email");
    });
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
  })
  test("can type in email, amd submit it", async () => {
    await user.type(input, "email");
    await user.click("submit")
  })


})
