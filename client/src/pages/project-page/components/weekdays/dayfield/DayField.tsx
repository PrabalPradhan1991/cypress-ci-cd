import { useEffect, useState } from "react";
import moment from "moment";
import "./DayField.scss";
import "assets/styles/style.scss";
import { dayfield } from "types/dayfield";

const timeStampToWeekday = (timeStamp: moment.Moment): string => {
  switch (timeStamp.weekday()) {
    case 0:
      return "So";
    case 1:
      return "Mo";
    case 2:
      return "Di";
    case 3:
      return "Mi";
    case 4:
      return "Do";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
    default:
      return "NaN";
  }
};

const timeStampToMonth = (timeStamp: moment.Moment): string => {
  switch (timeStamp.month()) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mär";
    case 3:
      return "Apr";
    case 4:
      return "Mai";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Okt";
    case 10:
      return "Nov";
    case 11:
      return "Dez";
    default:
      return "NaN";
  }
};

export interface DayfieldProps {
  dayfield: dayfield;
}

export interface DayfieldState {
  isWeekend: boolean;
}

export interface DayfieldProps {
  dayfield: dayfield;
}

export interface DayfieldState {
  isWeekend: boolean;
}

const Dayfield: React.FC<DayfieldProps> = (props) => {
  const { dayfield } = props;

  const [state, setState] = useState<DayfieldState>({
    isWeekend: false,
  });

  useEffect(() => {
    let weekday: string = timeStampToWeekday(dayfield.timeStamp);
    let isWeekend: boolean = false;
    if (weekday === "Sa" || weekday === "So") {
      isWeekend = true;
    }
    setState({ isWeekend });
  }, []);

  const getWeekdayClasses = (): string => {
    let classes = "weekday ";
    classes += state.isWeekend ? "weekend" : "";
    return classes;
  };

  const getDateClasses = (): string => {
    let classes = "date ";
    classes += state.isWeekend ? "invisible" : "";
    return classes;
  };

  const timeStamp: moment.Moment = dayfield.timeStamp;
  const weekday: string = timeStampToWeekday(timeStamp);
  const month: string = timeStampToMonth(timeStamp);
  const date: string = String(timeStamp.date());

  return (
    <div className="dayfield">
      <p className={getWeekdayClasses()}>{weekday}</p>
      <p className={getDateClasses()}>
        {month} {date}
      </p>
    </div>
  );
};

export default Dayfield;
