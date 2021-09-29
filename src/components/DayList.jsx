import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDays = days.map((pday) => (
    <DayListItem
      key={pday.id}
      name={pday.name}
      spots={pday.spots}
      selected={pday.name === day}
      setDay={setDay}
    />
  ));

  return <ul>{parsedDays}</ul>;
}
