import { useState } from "react";
// need to fix how I'm doing this function, need to use setHistory

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), next]);  // remove the last element and add the next mode as the final element
    }
    setHistory((prev) => [...prev, next]); // if not replacing the history, simply append next to prev
  };

  function back() {
    if (history.length === 1) { // if the length of our history is 1, that means that you can't go back further, so we just want to return that mode
      return setHistory((prev) => prev);
    }
    setHistory((prev) => [...prev.slice(0, -1)]); // extracting what the history of modes was prior
  }

  return { mode: history[history.length - 1], transition, back }; // set the mode as the last item in the past history array + return the value
  // returns object with keys mode transition back with values of mode state, transition function, + back function. Employing object shorthand notation for transition and back.
};
