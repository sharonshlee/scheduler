import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected, // if selected === "true"
    "day-list__item--full": spots === 0, //if spots is 0
  });

  console.log(dayClass, spots);

  const formatSpots = () => {
    if (spots === 0) return `no spots remaining`;
    if (spots === 1) return `${spots} spot remaining`;
    if (spots === 2) return `${spots} spots remaining`;
  };

  console.log(formatSpots());

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">
        {formatSpots()}
        {!formatSpots() && `${spots} spots reamining`}
      </h3>
    </li>
  );
}
