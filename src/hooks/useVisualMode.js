import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory((prev) => {
      let newHistory;

      if (replace) {
        newHistory = [...prev.slice(0, -1), mode];
      } else {
        newHistory = [...prev, mode];
      }
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };

  const back = () => {
    setHistory((prev) => {
      let newHistory;
      if (history.length > 1) {
        newHistory = [...prev].slice(0, -1);
      } else {
        newHistory = [...prev];
      }
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };

  return { mode, transition, back };
}
