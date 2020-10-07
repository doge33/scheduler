import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = function(props) {

    if (props.spots) {
      return props.spots === 1 ? "1 spot" :  `${props.spots} spots`;
    }
    return "no spots";
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day"> 
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)} remaining</h3>
    </li>
  );
}