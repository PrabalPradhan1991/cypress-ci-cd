import React from "react";
import styled from "styled-components";
import { LoadingButton } from "@atlaskit/button";
import EmojiIcon from "@atlaskit/icon/glyph/emoji";
import { useSelector } from "react-redux";
import CreateProjectModel from "models/CreateProjectModel";
import history from "router-history";

const CompletedForm: React.FC = () => {
  const projectState: CreateProjectModel = useSelector(
    (state: any) => state?.createProject?.project
  );
  const locale = useSelector((state: any) => state?.locale);

  const projectPath: string = `/project/link/${projectState?.id}?projectLink=${projectState?.adminLink}`;
  const fullLink: string = window.location.origin + projectPath;

  const goToProject = () => {
    history.push(projectPath);
  };

  return (
    <Box className="">
      <EmojiIcon label="SmileIcon" size="xlarge" primaryColor="#FF991F" />
      <h2>{locale?.strings?.project_created_successfully}</h2>
      <a href={fullLink}>{fullLink}</a>

      <LoadingButton appearance="primary" type="button" onClick={goToProject}>
        {locale?.strings?.go_to_project}
      </LoadingButton>
    </Box>
  );
};

const Box = styled.div`
  text-align: center;
  padding: 3rem 0 8rem;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin: 20px 0;
  }

  a {
    display: block;
    margin-bottom: 30px;
    line-height: 24px;
    color: #0052cc;
  }
`;

export default CompletedForm;
