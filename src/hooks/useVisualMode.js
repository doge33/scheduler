import { useState } from "react";

export default function useVisualMode(initialVal) {

  const [mode, setMode] = useState(initialVal);
  //set history of modes as an array so that we can go back to previous modes. 
  const [history, setHistory] = useState([initialVal]);

  const transition = (newMode, replace = false) => {

    //console.log("inside transition; history BEFORE transition is ---", history)
    if(replace === true) {

      history[history.length - 1] = newMode; //directly mutate the last mode in history, eg. 2 in [1,2] to become the new mode, eg. 3
      setMode(newMode);
      setHistory(history); //the history, eg. [1,2] is now the one with the mutated last-item , eg. [1,3]

    } else {
      setMode(newMode);
      const newHistory = [...history, newMode] //push item to history array
      setHistory(newHistory)
    }

    //console.log("inside transition; history AFTER transition is ---", newHistory)
  }

  const back = () => {

    //console.log("inside back; history BEFORE back is ---", history)
    
    if (history.length > 1) {
      history.pop(); //mutates the history array
      setMode(history[history.length - 1 ]);
      setHistory(history)
    }    
    //console.log("inside back; history AFTER back is ---", history)
  }

  return {mode, transition, back};
}

