import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 1) {
      return (
        `${props.spots} spot remaining`
      )
    }
    else if (props.spots === 0) {
      return (
        "no spots remaining"
      )
    }
  return (
    `${props.spots} spots remaining`
    )
  }

  const listClass = classNames("day-list__item",
   {"day-list__item--selected": props.selected}, 
   {"day-list__item--full": !props.spots
  });

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};
