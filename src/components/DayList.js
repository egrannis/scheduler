import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const {days, day, setDay} = props; // destructuring our properties before addressing mapped function

  const mapped = days.map((d) => {
    return (
      <DayListItem
      key={d.id}
      name={d.name}
      spots={d.spots}
      selected={day === d.name}
      setDay={setDay}
      />
    )
  });
  return <ul>{mapped}</ul>;
}