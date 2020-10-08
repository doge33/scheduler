import { useState } from "react";

export default function useVisualMode(initialVal) {

  const [mode, setMode] = useState(initialVal);
  //set history of modes as an array so that we can go back to previous modes. 
  const [history, setHistory] = useState([initialVal]);

  const transition = (newMode, replace = false) => {

    setMode(newMode);

    if (replace) {
      //transition + replaces the previous mode with the current mode
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode])

    } else {

     setHistory(prev => [...prev, newMode]);
    } 
  };

  const back = () => {
    
    if (history.length > 1) {

      const newHistory = history.slice(0, history.length - 1)
      
      setMode(newHistory[newHistory.length - 1 ]);
      
      setHistory(() => newHistory)
    }    
   
  };

  return {mode, transition, back};
};

