import React from "react";
import { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0
const initialIndex = 4; // the index the "B" is at

const URL = "http://localhost:9000/api/result";

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);//also confused which message i should be using this piece of state for ? 
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex);
 

  function getXY(index) {
    //There are multiples ways of doing the logic for that, but yes. For example: if we are looking for y (which is our row) we can know that it is in the first row if the index number is less than 3 since the top row would be either 0, 1, or 2 for the top row. But that is just one way of doing it.
    //So gexXY is going to get the coordinates from the index and getXYMessage will get the coordinates it needs to print from the getXY function.
  //   // It it not necessary to have a state to track the coordinates.
  //   // It's enough to know what index the "B" is at, to be able to calculate them.
  let x, y 
  if (index === 0) {
    x = 1;
    y = 1;
  } else if (index === 1) {
    x = 2;
    y = 1;
  } else if (index === 2) {
    x = 3;
    y = 1;
  } else if (index === 3) {
    x = 1;
    y = 2;
  } else if (index === 4) {
    x = 2;
    y = 2;
  } else if (index === 5) {
    x = 3;
    y = 2;
  } else if (index === 6) {
    x = 1;
    y = 3;
  } else if (index === 7) {
    x = 2;
    y = 3;
  } else if (index === 8) {
    x = 3;
    y = 3;
  }
   return [x, y];
}

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [x, y] = getXY(index);
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {//this function is working and accurately reseting all the values and the starting square at proper coordinates
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //Then get next index will decide what number move should be changing the index to.
    //If it shouldn't go up any higher then getNextIndex doesn't change the current index number otherwise it adjusts it based on the direction you are trying to go.
    //For example, if you want to move left, that would be one index number lower if you're not at the start of that row already.

    const [currentX, currentY] = getXY(index); //this whole function is not moving the squares properly, but the coordinates are correct and displaying correctly

    let nextX = currentX;
    let nextY = currentY;

    if (direction === 'left') {
      nextX = Math.max(1, nextX - 1);
    } else if (direction === 'right') {
      nextX = Math.min(3, nextX + 1);
    } else if (direction === 'up') {
      nextY = Math.max(1, nextY - 1);
    } else if (direction === 'down') {
      nextY = Math.min(3, nextY + 1);
    }

    let nextIndex = (nextY - 1) * 3 + nextX - 1;
    return nextIndex;

  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    //Then when you go to move, you will need to update index, the number of steps, and the message. That is a good place to have it update "you can't go this direction". and you would interpolate the specific direction
    const nextIndex = getNextIndex(direction);

    if (nextIndex != index) {
      setIndex(nextIndex);
      
      setSteps(prevSteps => prevSteps + 1);

      setMessage(`You moved ${steps + 1} times.`);
    } else {
      setMessage(`You can't go ${direction}.`);
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
    const emailInput = email;
    const [currentX, currentY] = getXY(index);
    axios
      .post(URL, {
        x: currentX,
        y: currentY,
        steps: steps,
        email: emailInput,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(`You moved ${steps} times`);
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
          Coordinates ({getXY(index)[0]}, {getXY(index)[1]})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx => (
          <div
          key={idx}
          className={`square${getXY(idx)[0] === getXY(index)[0] && getXY(idx)[1] === getXY(index)[1] ? ' active' : ''}`}
          >
          {getXY(idx)[0] === getXY(index)[0] && getXY(idx)[1] === getXY(index)[1] && 'B'}
          </div>
        )))}
      </div>
      <div className="info">
        {message.startsWith("You can't go") ? (
            <div id="message">{message}</div>//the 'you cant go ____' message isnt applying the message class, & don't understand how to show the number of wins or what even constitutes as a 'win'??? and also how to just display the persons email w/o the @sdmkfmsd part
        ) : <div>{`${email} won # of times`}</div>} 
        
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
