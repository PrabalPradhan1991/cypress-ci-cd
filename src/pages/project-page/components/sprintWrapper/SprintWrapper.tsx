import moment from "moment";
import React, { useEffect, Fragment, useState } from "react";
import { Sprint, User2projects } from "models/ProjectModel";
import CapaFields from "../capa-fields/CapaFields";
import SprintCard from "../sprint-card/SprintCard";
import Weekdays from "../weekdays/Weekdays";
import * as CapacityService from "services/capacity.service";
import { useSelector } from "react-redux";
import { EventBus } from "Event";
interface SprintWrapperProps {
  sprintIndex: number;
  projectLink: string;
  projectName: string;
  sprint: Sprint;
  users: User2projects[];
}

const SprintWrapper: React.FC<SprintWrapperProps> = (props) => {
  const [capacity, setCapacity] = useState<number>(0);
  const { projectLink, projectName, sprint, users, sprintIndex } = props;

  const getCapacity = async (args: CapacityService.getCapacityBySprintArgs) => {
    let res = await CapacityService.getCapacityBySprint(args);
    let newCapacity = res.data.capacity;
    setCapacity(newCapacity);
  };

  const locale = useSelector((state: any) => state?.locale);

  const formatDate = (date: string, lengthInWeeks: number): string => {
    const startDate: moment.Moment = moment(date);
    let endDate: moment.Moment = startDate.clone();
    endDate = endDate.add(lengthInWeeks * 7 - 1, "days");

    let format: string = "DD. MMMM YYYY";
    if (startDate.format("YY") === endDate.format("YY")) {
      if (startDate.format("MM") === endDate.format("MM")) {
        format = "DD. ";
      } else {
        format = "DD. MMMM";
      }
    } else {
      format = "DD. MMMM YYYY";
    }

    const formattedDate: string =
      startDate.format(format) + " - " + endDate.format("DD. MMMM YYYY");
    return formattedDate;
  };

  useEffect(() => {
    // @FIXME TEMP FIX
    // add get sprint capacity of that sprint to events
    // add all the slots and sprints data in redux store
    EventBus.on(`${projectName}-sprint${sprint?.id}`, getCapacity);
    getCapacity({
      sprintId: sprint.id,
      projectLink: projectLink,
    });
  }, []);

  return (
    <Fragment>
      <div className="sprintCard">
        <SprintCard
          sprintGoal={sprint.sprintGoal}
          sprintReference={sprint.sprintReference}
          capacity={capacity}
          sprintId={sprint.id}
          projectLink={projectLink}
          projectName={projectName + " " + (sprintIndex + 1)}
          projectDate={
            locale?.strings?.period +
            ": " +
            formatDate(sprint.sprintStartDate, Number(sprint.intervalTime))
          }
        ></SprintCard>
      </div>
      <div className="week">
        <Weekdays
          sprintLength={Number(sprint.intervalTime)}
          sprintStart={moment(sprint.sprintStartDate)}
        ></Weekdays>
      </div>
      <div className="plan">
        {users.map((user, userIndex) =>
          user.role.type !== "user" ? (
            true
          ) : (
            <div key={userIndex}>
              <CapaFields
                updateSprintCapa={getCapacity}
                sprintLength={Number(sprint.intervalTime)}
                sprintStart={moment(sprint.sprintStartDate)}
                user2projectId={user.id}
                user={user.user}
                sprintId={sprint.id}
                projectLink={projectLink}
              ></CapaFields>
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default SprintWrapper;
