import Button from "@atlaskit/button";
import React from "react";
import * as SprintService from "services/sprint.service";
import { useDispatch, useSelector } from "react-redux";
import {
  projectIsLoading,
  getProject,
  GetProjectActionArgs,
} from "store/actions/projectActions";

export interface LoadSprintBtnProps {
  projectLink: string;
  projectId: number;
}

const LoadSprintBtn: React.FC<LoadSprintBtnProps> = (props) => {
  const dispatch = useDispatch();
  const locale = useSelector((state: any) => state?.locale);

  const projectId = useSelector((state: any) => state.project.project.id);

  const loadSprints = async () => {
    dispatch(projectIsLoading(true));
    const args: SprintService.addSprintArgs = {
      projectId: props.projectId,
      projectLink: props.projectLink,
    };
    await SprintService.addSprint(args);
    dispatch(
      getProject({
        projectLink: props.projectLink,
        projectId: projectId,
      } as GetProjectActionArgs)
    );
  };

  return (
    <Button appearance="primary" onClick={loadSprints}>
      {locale?.strings?.next_sprint}
    </Button>
  );
};

export default LoadSprintBtn;
