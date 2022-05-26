import { useState } from "react";

// Function that saves the mode history and sets the new mode
// Includes transition function, which either replaces the current mode with the next one. If "replace" isn't passed as truthy, it saves a history of all modes
// The back function takes the user back to the previous mode when they click a cancel button by accessing the previous mode

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
    if (history.length === 1) { // if the length of our history is 1, that means that you can't go back further, so simply return that mode
      return setHistory((prev) => prev);
    }
    setHistory((prev) => [...prev.slice(0, -1)]); // extracting what the history of modes was prior
  }

  return { mode: history[history.length - 1], transition, back }; // set the mode as the last item in the past history array + return the value
  // returns object with keys mode, transition, + back. Employing object shorthand notation for transition and back and setting mode to the value of the last item in the history array.
};
