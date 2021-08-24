import {ProgressTracker, Stages} from "@atlaskit/progress-tracker";
import React from "react";
import {useSelector} from "react-redux";
import ConfirmEmailModel from "models/ConfirmEmailModel";
import CreateProjectModel from "models/CreateProjectModel";
import CreateSprintModel from "models/CreateSprintModel";
import ProjectOnboardingPage from "./components/CreateProjectOnboarding";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./NewProjectPage.scss";

export const NewProjectPage: React.FC = () => {
  /**
   * More info on react hooks and redux:
   * https://blog.bitsrc.io/using-react-redux-hooks-97654aff01e4
   * https://thoughtbot.com/blog/using-redux-with-react-hooks
   * https://react-redux.js.org/api/hooks
   */
  // FIXME: State should have type definition
  const project: CreateProjectModel = useSelector(
    (state: any) => state.createProject.project
  );
  const sprint: CreateSprintModel = useSelector(
    (state: any) => state.createSprint.sprint
  );
  const eMail: ConfirmEmailModel = useSelector(
    (state: any) => state.confirmEmail.eMail
  );
  const locale = useSelector((state: any) => state?.locale);

  const items: Stages = [
    {
      id: "1",
      label: locale?.strings?.create_project,
      percentageComplete: project.projectName !== "" ? 100 : 0,
      status: "visited",
      href: "#",
      noLink: true,
    },
    {
      id: "2",
      label: locale?.strings?.confirm_email,
      percentageComplete: eMail.createdAt !== "" ? 100 : 0,
      status: "visited",
      href: "#",
      noLink: true,
    },
    {
      id: "3",
      label: locale?.strings?.set_iteration,
      percentageComplete: sprint.intervalTime !== "" ? 100 : 0,
      status: "visited",
      href: "#",
      noLink: true,
    },
    {
      id: "4",
      label: locale?.strings?.ready,
      percentageComplete: 0,
      status: "visited",
      href: "#",
      noLink: true,
    },
  ];

  return (
    <div>
      <div className="background-container__bar"></div>
      <div className="background-container">
        <div className="background-container__image"></div>
        <div className="background-container__bar"></div>
      </div>
      <div className="container">
        <div className="container-card">
          <div className="container-tracker">
            <ProgressBar />
            {/* <ProgressTracker items={items} /> */}
          </div>
          <ProjectOnboardingPage />
        </div>
      </div>
    </div>
  );
};
