import { useState } from "react";

export default function useVisualMode(initialVal) {

  const [mode, setMode] = useState(initialVal);
  //set history of modes as an array so that we can go back to previous modes. 
  const [history, setHistory] = useState([initialVal]);

  const transition = (newMode, replace = false) => {

    const historyCopy = [...history];

    setMode(newMode);
    if (replace) {
      
      historyCopy[historyCopy.length- 1] = newMode;

      setHistory(historyCopy);

    } else {
      //setHistory([...history, newMode]);
      history.push(newMode)   // ==> how to avoid this???
      setHistory(history);
    } 
  }


    /*
    console.log("inside transition; history BEFORE transition is ---", history)
    if(replace) {

      console.log("inside replace === true")
      console.log("newMode is--", newMode)
      const historyCopy = history.slice(0, history.length - 1)

      //historyCopy[historyCopy.length - 1] = newMode; //directly mutate the last mode in history, eg. 2 in [1,2] to become the new mode, eg. 3
      setMode(newMode);
      setHistory(() => ([...historyCopy, newMode])) // => gives [empty, error_save]
      //setHistory((prev) => [...prev, newMode]) //=>gives [empty, create, saving, error_save]


    } else {
      console.log("inside replace === false")

      console.log("newMode is--", newMode)
      setMode(newMode);
      //const newHistory = [...historyCopy, newMode] //push item to history array
      //)
      setHistory(prev => ([...prev, newMode]))
    }

    //console.log("inside transition; history AFTER transition is ---", newHistory)
  }
*/
  const back = () => {
    //console.log("inside back; history BEFORE back is ---", history)

    if (history.length > 1) {

      const newHistory = history.slice(0, history.length - 1)
      
      setMode(newHistory[newHistory.length - 1 ]); //last item of the array
      
      setHistory(() => newHistory)
    }    
    //console.log("inside back; history AFTER back is ---", history)
  }

  return {mode, transition, back};
}

