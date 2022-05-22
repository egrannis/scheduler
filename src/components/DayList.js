import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const {days, value, onChange} = props; // destructuring our properties before addressing mapped function

  const mapped = days.map((d, index) => {
    return (
      <DayListItem
      key={index}
      name={d.name}
      spots={d.spots}
      selected={value === d.name}
      setDay={onChange}
      />
    )
  });
  return <ul>{mapped}</ul>;
}