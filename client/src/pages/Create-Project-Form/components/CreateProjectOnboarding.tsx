import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import CompletedForm from "./CompletedForm";
import ConfirmEmailForm from "./input-fields/ConfirmEmailForm";
import ProjectForm from "./input-fields/CreateProjectForm";
import SprintForm from "./input-fields/CreateSprintForm";

export const Onboarding: React.FC = () => {
  const defaultSelectedIndex = 0;
  const selectedIndex =
    useSelector(
      (state: any) => state?.createProjectOnboarding?.selectedIndex
    ) || defaultSelectedIndex;

  const locale = useSelector((state: any) => state?.locale);

  return (
    <div>
      {selectedIndex === 0 && (
        <Title>{locale?.strings?.create_new_project}</Title>
      )}
      {selectedIndex === 0 && <ProjectForm />}

      {selectedIndex === 1 && (
        <div>
          <div className="email-img-container">
            <div className="email-img-container__img"></div>
          </div>
          <ConfirmEmailForm />
        </div>
      )}

      {selectedIndex === 2 && (
        <Title>{locale?.strings?.need_sprint_info}</Title>
      )}
      {selectedIndex === 2 && <SprintForm />}

      {selectedIndex === 3 && <CompletedForm />}
    </div>
  );
};
const Title = styled.h2`
  margin-bottom: 1.2rem;
`;

export default Onboarding;
