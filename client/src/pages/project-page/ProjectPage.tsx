import Spinner from "@atlaskit/spinner";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "moment/locales/de_locale";
import * as ProjectActions from "store/actions/projectActions";
import { ProjectStoreState } from "store/reducers/projectReducer";
import history from "router-history";
import CapaFieldLegende from "./components/capa-field-legende/CapaFieldLegende";
import LoadSprintBtn from "./components/load-sprint-btn/LoadSprintBtn";
import { NewUser } from "./components/new-user/NewUser";
import { ProjectNotFound } from "./components/project-not-found/ProjectNotFound";
import SprintWrapper from "./components/sprintWrapper/SprintWrapper";
import UserInfo from "./components/user-info/UserInfo";
import "./ProjectPage.scss";

const getProjectArgs = (): ProjectActions.GetProjectActionArgs => {
  let urlSplit: string[] = history.location.pathname.split("/");
  let urlSplit2: string[] = history.location.search.split("projectLink=");

  let projectId: string = urlSplit[urlSplit.length - 1];
  let projectLink: string = urlSplit2[urlSplit2.length - 1];
  let args: ProjectActions.GetProjectActionArgs = {
    projectLink: projectLink,
    projectId: Number(projectId),
  };
  return args;
};

export const Projects: React.FC<{}> = () => {
  const project: ProjectStoreState = useSelector((state: any) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    const projectArgs = getProjectArgs();
    dispatch(ProjectActions.getProject(projectArgs));
  }, []);

  const activeSprintIndex = (): number => {
    const sprints = project.project.sprints;
    const today: moment.Moment = moment();
    for (let index: number = 0; index < sprints.length; index++) {
      const sprint = sprints[index];
      const sprintStartDate: moment.Moment = moment(sprint.sprintStartDate);
      const intervalTime: number = Number(sprint.intervalTime);
      const sprintEndDate = sprintStartDate.clone().add(intervalTime, "weeks");
      if (today.isBetween(sprintStartDate, sprintEndDate)) {
        return index;
      } else {
      }
    }
    //FIXME: Has to check if todays date is before first sprint or after last sprint
    return 0;
  };

  return (
    <Fragment>
      {project.isLoading ? (
        <div className="loadingContainer">
          <Spinner size="xlarge" />
        </div>
      ) : project.hasErrored ? (
        // FIXME: Component that shows the Business Error from Backend
        <ProjectNotFound></ProjectNotFound>
      ) : (
        // When everything went fine

        <Fragment>
          <div className={"table"}>
            <div className="header">
              <div className="legende">
                <CapaFieldLegende></CapaFieldLegende>
              </div>
              <div className="headSpacer"></div>
              <div className="users">
                {project.project.users.map((user, index) =>
                  user.role.type !== "user" ? (
                    true
                  ) : (
                    <UserInfo
                      key={index}
                      user={user.user}
                      projectLink={project.project.projectLink.link}
                      role={user.role.projectRole}
                    ></UserInfo>
                  )
                )}
                <NewUser
                  //FIXME: Index of array has to be different for non-admin users
                  projectId={project.project.id}
                  projectLink={project.project.projectLink.link}
                ></NewUser>
              </div>
            </div>
            {project.project.sprints.map((sprint, sprintIndex) =>
              //FIXME: key value does not start at 0 --> Problem?
              //FIXME: Best practice -> no index values as key prop
              sprintIndex < activeSprintIndex() ? (
                true
              ) : (
                <div
                  className="wrapper"
                  key={sprintIndex - activeSprintIndex()}
                >
                  <div className="wrapperSpacer"></div>
                  <SprintWrapper
                    sprintIndex={sprintIndex}
                    projectLink={project.project.projectLink.link}
                    projectName={project.project.projectName}
                    sprint={sprint}
                    users={project.project.users}
                  ></SprintWrapper>
                  <div className="newUserSpacer"></div>
                </div>
              )
            )}
          </div>
          <div className="loadSprintWrapper">
            <LoadSprintBtn
              projectId={project.project.id}
              projectLink={project.project.projectLink.link}
            ></LoadSprintBtn>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
