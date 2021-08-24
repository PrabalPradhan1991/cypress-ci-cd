import moment from "moment";
import * as React from "react";
import * as SlotService from "services/slot.service";
import { capafield } from "types/capafield";
import CapaField from "./capa-field/CapaField";
import "./CapaFields.scss";
import { SumField } from "../sum-field/SumField";
import * as CapacityService from "services/capacity.service";
import { User } from "models/ProjectModel";

export interface CapaFieldsProps {
  sprintLength: number;
  sprintStart: moment.Moment;
  user2projectId: number;
  user: User;
  sprintId: number;
  projectLink: string;
  updateSprintCapa: Function;
}

export interface CapaFieldsState {
  capaFields: capafield[];
}

const generateCapafields = (sprintLengthInWeeks: number): capafield[] => {
  let length = sprintLengthInWeeks * 14;
  let capaFields: capafield[] = [];
  for (let i: number = 0; i < length; i++) {
    capaFields.push({
      id: i,
      capacity: 2,
      apiId: -1,
      timeStamp: null,
    });
  }
  return capaFields;
};

const CapaFields: React.FC<CapaFieldsProps> = (props) => {
  const [capaFields, setCapaFields] = React.useState<capafield[]>(() => {
    return generateCapafields(props.sprintLength);
  });
  const [capaSum, setCapaSum] = React.useState<number>(0);

  const changeCapacity = async (capafield: capafield) => {
    const newCapaFields: capafield[] = [...capaFields];
    const id = capafield.id;
    let capacity = capafield.capacity;
    if (
      newCapaFields[id].timeStamp?.isoWeekday() === 6 ||
      newCapaFields[id].timeStamp?.isoWeekday() === 7
    ) {
      newCapaFields[id].capacity =
        capacity < 3 ? (capacity += 1) : (capacity = 0);
    } else {
      newCapaFields[id].capacity =
        capacity < 2 ? (capacity += 1) : (capacity = 0);
    }
    setCapaFields(newCapaFields);
    const slotData: SlotService.SlotData = {
      capacity: newCapaFields[id].capacity,
      id: newCapaFields[id].apiId,
      projectLink: props.projectLink,
    };
    await SlotService.putSlot(slotData);
    getSlots();
    getCapaSum();
    props.updateSprintCapa();
  };

  const dateToIds = (timeStamp: moment.Moment): number => {
    const sprintStart = props.sprintStart
      .clone()
      .hours(0)
      .minutes(0)
      .seconds(0);
    const difference = timeStamp.diff(sprintStart, "days");
    // FIXME
    // @TODO fix the backends db dates to be of type date rather than string
    // in backend moment js is used at its timezone is set to 'Europe/Berlin'
    // set utcoffset to german it works TEMPFIX
    // error due to utcoffset being +2:00 and +1:00 due to DST
    timeStamp.utcOffset(200);

    if (timeStamp.format("A") === "AM") {
      return difference * 2;
    } else {
      return difference * 2 + 1;
    }
  };

  const getSlots = async () => {
    let myCapaFields: capafield[] = [...capaFields];
    const args: SlotService.getSlotsArgs = {
      user2projectId: props.user2projectId,
      sprintId: props.sprintId,
      projectLink: props.projectLink,
    };

    try {
      const res = await SlotService.getSlots(args);
      const newCapaFields = res.data;
      myCapaFields = newCapaFields.reduce(
        (total: capafield[], capafield: any, index: number): capafield[] => {
          const timeStamp: moment.Moment = moment(capafield.time);
          const newCapaId: number = dateToIds(timeStamp);
          const newCapa: capafield = {
            id: newCapaId,
            capacity: capafield.capa,
            apiId: capafield.id,
            timeStamp: timeStamp,
          };
          total[newCapaId] = newCapa;
          return total;
        },
        []
      );
    } catch (error) {
    } finally {
      setCapaFields(myCapaFields);
    }
  };

  const getCapaSum = async () => {
    const args: CapacityService.getCapacityByUserArgs = {
      userId: props.user.id,
      sprintId: props.sprintId,
      projectLink: props.projectLink,
    };
    try {
      let res = await CapacityService.getCapacityByUser(args);
      let newCapacity = res.data.capacity;
      setCapaSum(newCapacity);
    } catch (error) {}
  };

  React.useEffect(() => {
    getSlots();
    getCapaSum();
  }, []);

  return (
    <React.Fragment>
      <div className="capaFields">
        {capaFields.map((capafield) => (
          <CapaField
            changeCapacity={changeCapacity}
            capafield={capafield}
            key={capafield.id}
          ></CapaField>
        ))}
      </div>
      <SumField capaSum={capaSum}></SumField>
    </React.Fragment>
  );
};

export default CapaFields;
