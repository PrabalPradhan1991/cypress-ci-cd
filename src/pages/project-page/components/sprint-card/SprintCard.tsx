import { useDispatch, useSelector } from "react-redux";
import "./SprintCard.scss";
import React from "react";
import TextField from "@atlaskit/textfield";
import { updateSprint } from "store/actions/projectActions";

export interface SprintCardProps {
  projectName: string;
  projectDate: string;
  projectLink: string;
  sprintGoal: string;
  sprintReference: string;
  sprintId: number;
  capacity: number;
}

export const SprintCard: React.FC<SprintCardProps> = (props) => {
  const {
    projectName,
    projectDate,
    sprintId,
    sprintGoal,
    sprintReference,
    projectLink,
  } = props;
  const locale = useSelector((state: any) => state?.locale);
  const dispatch = useDispatch();

  const onBlurSprintGoal = async (e: any) => {
    dispatch(
      await updateSprint(sprintId, projectLink, {
        sprintGoal: e?.target?.value,
      })
    );
  };

  const onBlurReference = async (e: any) => {
    dispatch(
      await updateSprint(sprintId, projectLink, {
        sprintReference: e?.target?.value,
      })
    );
  };

  return (
    <div className="card">
      <p>Iteration</p>
      <div className="name">
        <p>{projectName}</p>
      </div>
      <div className="points">
        <p>
          {props.capacity}{" "}
          {props.capacity === 1
            ? locale?.strings?.person_day
            : locale?.strings?.person_days}
        </p>
      </div>
      <div className="iteration">
        <p>{projectDate}</p>
      </div>
      <div>
        <div className="name">
          <p>Sprint Goal</p>
        </div>
        <TextField
          autoComplete="off"
          onBlur={onBlurSprintGoal}
          defaultValue={sprintGoal}
        />
      </div>
      <div>
        <div className="name">
          <p>Sprint Reference</p>
        </div>
        <TextField
          autoComplete="off"
          onBlur={onBlurReference}
          defaultValue={sprintReference}
        />
      </div>
    </div>
  );
};

export default SprintCard;
