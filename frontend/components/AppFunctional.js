import React from "react";
import { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
// const initialSteps = 0
const initialIndex = 4; // the index the "B" is at

const URL = "http://localhost:9000/api/result";

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  // const [steps, setSteps] = useState(initialSteps)
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeSquare, setActiveSquare] = useState([2, 2]);
  const [moves, setMoves] = useState(0);

  // function getXY() {
  //   // It it not necessary to have a state to track the coordinates.
  //   // It's enough to know what index the "B" is at, to be able to calculate them.

  // }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `You moved ${moves} times`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    // setSteps(initialSteps);
    setCurrentIndex(initialIndex);
    setActiveSquare([2, 2]);
    setMoves(0);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //   const [x, y] = activeSquare;
    //   let [nextX, nextY] = [x, y];
    //   switch(direction) {
    //     case 'left':
    //       nextX = Math.max(0, x - 1);
    //       break;
    //     case 'up':
    //       nextY = Math.max(0, y - 1);
    //       break;
    //     case 'right':
    //       nextX = Math.min(2, x + 1);
    //       break;
    //     case 'down':
    //       nextY = Math.min(2, y + 1);
    //       break;
    //       default:
    //       break;
    //   }
    //   return [nextX, nextY];
    //   // let left = (x - 1, y);
    //   // let right = (x + 1, y);
    //   // let up = (x, y - 1);
    //   // let down = (x, y + 1);  }
    //0 1 2
    //3 4 5
    //6 7 8
    let nextX = activeSquare[0];
    let nextY = activeSquare[1];

    if (direction === "left") {
      if (nextX === 0) {
        return "You can't go left";
      }
      nextX--;
    } else if (direction === "right") {
      if (nextX === 2) {
        return "You can't go up";
      }
      nextX++;
    } else if (direction === "up") {
      if (nextY === 0) {
        return "You can't go up";
      }
      nextY--;
    } else if (direction === "down") {
      if (nextY === 2) {
        return "You can't go down";
      }
      nextY++;
    }

    return[nextX, nextY];
  }
  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const nextCoordinates = getNextIndex(direction);

    if (Array.isArray(nextCoordinates)) {
      setActiveSquare(nextCoordinates);
      setMoves(moves + 1);
    } else {
      console.log(nextCoordinates);
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setEmail(value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const emailInput = evt.target.elements.email.value;
    axios
      .post(URL, {
        x: activeSquare[0],
        y: activeSquare[1],
        steps: moves,
        email: emailInput,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(`${emailInput} moved ${moves} times`);
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({activeSquare[0]}, {activeSquare[1]})
        </h3>
        <h3 id="steps">{getXYMessage()}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx => (
          <div
          key={idx}
          className={`square${activeSquare[0] === idx % 3 && Math.floor(activeSquare[1] / 3) === Math.floor(idx / 3) ? ' active' : ''}`}
          >
          {activeSquare[0] === idx % 3 && Math.floor(activeSquare[1] / 3) === Math.floor(idx / 3) && 'B'}
          </div>
        )))}
          
        
          
        
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move("left")}>
          LEFT
        </button>
        <button id="up" onClick={() => move("up")}>
          UP
        </button>
        <button id="right" onClick={() => move("right")}>
          RIGHT
        </button>
        <button id="down" onClick={() => move("down")}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
