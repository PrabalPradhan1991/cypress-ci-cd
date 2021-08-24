import React from "react";
import Dayfield from "./dayfield/DayField";
import moment from "moment";
import { dayfield } from "types/dayfield";
import "./Weekdays.scss";

const generateDayfields = (
  startTime: moment.Moment,
  lengthInWeeks: number
): dayfield[] => {
  const length = lengthInWeeks * 7;
  let dayfields: dayfield[] = [];
  for (let i: number = 0; i < length; i++) {
    let timeStamp: moment.Moment = startTime.clone();
    timeStamp = timeStamp.add(i, "days");
    dayfields.push({
      id: i,
      timeStamp: timeStamp,
    });
  }
  return dayfields;
};

export interface WeekdaysProps {
  sprintStart: moment.Moment;
  sprintLength: number;
}

export interface WeekdaysState {
  dayfields: dayfield[];
}

const Weekdays: React.FC<WeekdaysProps> = (props) => {
  const { sprintStart, sprintLength } = props;
  return (
    <div className="weekdays">
      {generateDayfields(sprintStart, sprintLength).map((dayfield) => (
        <Dayfield key={dayfield.id} dayfield={dayfield}></Dayfield>
      ))}
      <div className="sumIconBorder">
        <div className="sumIcon">∑</div>
      </div>
    </div>
  );
};
export default Weekdays;
