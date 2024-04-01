import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [activeSquare, setActiveSquare] = useState([1, 1])
  const [moves, setMoves] = useState(0)



  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    
  }

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
    setSteps(initialSteps);
    setIndex(initialIndex);
    setActiveSquare([2, 2]);
    setMoves(0);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const [x, y] = activeSquare;
    let [nextX, nextY] = [x, y];
    switch(direction) {
      case 'left':
        nextX = Math.max(0, x - 1);
        break;
      case 'up':
        nextY = Math.max(0, y - 1);
        break;
      case 'right':
        nextX = Math.min(8, x + 1);
        break;
      case 'down':
        nextY = Math.min(8, y + 1);
        break;
        default:
        break;
    }
    return [nextX, nextY];
    // let left = (x - 1, y);
    // let right = (x + 1, y);
    // let up = (x, y - 1);
    // let down = (x, y + 1);
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const [nextX, nextY] = getNextIndex(direction);
    setActiveSquare([nextX, nextY]);
    setMoves(moves + 1);

  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target
    setEmail(value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(URL, {
      x: activeSquare[0],
      y: activeSquare[1],
      steps: moves, 
      email: email,
     })
     .then((response) => {
      console.log(response.data);
     })
     .catch((error) => {
      console.error("Error:", error);
     });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({activeSquare[0]}, {activeSquare[1]})</h3>
        <h3 id="steps">{getXYMessage()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${activeSquare[0] === idx % 3 && activeSquare[1] === Math.floor(idx / 3) ? ' active' : ''}`}>
              {activeSquare[0] === idx % 3 && activeSquare[1] === Math.floor(idx / 3) ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
