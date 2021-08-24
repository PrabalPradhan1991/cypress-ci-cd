import React from "react";
import Button from "@atlaskit/button";
import { Link } from "react-router-dom";
import { routes } from "utils/routes";

export const ProjectButton: React.FC = () => {
  return (
    <div>
      <h1>Create Project</h1>
      <Button appearance="primary">
        <Link to={routes.app.createProjectPage}>Create New Project</Link>
      </Button>
    </div>
  );
};
