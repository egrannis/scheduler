import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    if (replace) {
      history.pop();
      history.push(next);
      return setMode(next);
    }
    history.push(next);
    return setMode(next);
  }

  function back() {
    history.pop();
    return setMode(history[history.length - 1]);
  }

  return { mode, transition, back }; // returns object with keys mode transition back with values of mode state, transition function, + back function. Employing object shorthand notation.
}
