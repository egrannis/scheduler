import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition (next) {
    history.push(next);
    console.log('history after push:', history)
   return setMode(next);
  }

  function back () {
    history.pop();
    console.log('history after pop:', history);
    return setMode(history[history.length-1]);
  }

  return { mode, transition, back };
}

 // onChange: (e) => setValue(e.target.value)