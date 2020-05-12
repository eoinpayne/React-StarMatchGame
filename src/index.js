import React, { useState } from 'react'
// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const NumberGenerator = (props) => {
  // const clickHandler (event) => {}
  const handleClick = (event) => props.onClick()
  return (
    <button
      style={{ backgroundColor: colors[props.status] }}
      className="number"
      onClick={() => {
        props.onClick(props.number, props.status)
      }}>
      {props.number}
    </button>
  )
}

const StarGenerator = (props) => {
  return (
    <>
      {utils.range(1, props.starCount).map(starID => <div key={starID} className="star" />)}
    </>
  )
}





const StarMatchApp = () => {
  const [numberOfStars, setNumberOfStars] = useState(utils.random(1, 9));
  const [avilableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);

  // when sum of canidates are greater than the stars
  const candidatesAreWrong = utils.sum(candidateNumbers) > numberOfStars;
  const numberStaus = (number) => {
    if (!avilableNumbers.includes(number)) {
      console.log('used')
      return "used";
    }
    if (candidateNumbers.includes(number)) {
      console.log(candidatesAreWrong ? "wrong" : "candidate");
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    console.log('available')
    return "available"

  }

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus == "used") {
      return;
    }

    //// if not used then it was available and is now a candidate
    // let newCandidateNumbers = [];
    // if (!candidateNumbers.includes(number)) {    //it's not used, and is not candidate (so is AVAILABLE) so add to candidate
    //   newCandidateNumbers = candidateNumbers.concat(number);
    // }
    // else {  //it's not used, but WAS/IS a candidate, (UNAVAILABLE?) so now deslect it by removing from candidate numbers, making it available
    //   newCandidateNumbers = candidateNumbers.filter(
    //     n => n !== number);
    // }

    const newCandidateNumbers = 
      currentStatus === "available" ? candidateNumbers.concat(number) : candidateNumbers.filter(
            n => n !== number);


    if (utils.sum(newCandidateNumbers) !== numberOfStars) {
      setCandidateNumbers(newCandidateNumbers)
    } else { //else correct guess. redraw stars, clear candidates, remove candiates from avalable
      const newAvailableNumbers = avilableNumbers.filter(
        //new available numbers should be only those NOT in newCandidate nums
        n => !newCandidateNumbers.includes(n)) 
      setNumberOfStars(utils.randomSumIn(newAvailableNumbers, 9));
      setAvailableNumbers(newAvailableNumbers);
      setCandidateNumbers([]);

    }


  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarGenerator starCount={numberOfStars} />
        </div>
        {/* <StarGenerator /> */}
        <div className="right">
          {utils.range(1, 9).map(number =>
            <NumberGenerator
              key={number}
              number={number}
              status={numberStaus(number)} //{highlightCandidate}
              number={number}
              onClick={onNumberClick}
            />
          )}
        </div>


      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};



// function StarMatchApp (props) {
//   const mycon = "";
// }

ReactDOM.render(
  <StarMatchApp title=" Star Match App" />,
  document.getElementById('root')
);
serviceWorker.unregister();
