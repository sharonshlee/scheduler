import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      //set the history to reflect that we are replacing the current mode.
      history.pop();
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);
    }
  };

  return { mode, transition, back };
}
