import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type Token = {
  id: string;
};

export const EmailConfirmPage: React.FC<RouteComponentProps<Token>> = () => {
  return (
    <div>
      <h1>Email bestätigt</h1>
    </div>
  );
};
