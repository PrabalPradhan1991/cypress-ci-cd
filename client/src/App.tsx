import React from "react";
import { Router, Route } from "react-router-dom";
import history from "router-history";
import { Projects } from "pages/project-page/ProjectPage";
import { NewProjectPage } from "pages/Create-Project-Form/NewProjectPage";
import { Navbar } from "components/Navbar/Navbar";
import { EmailConfirmPage } from "pages/email-confirm-page/EmailConfirmPage";
import { GlobalErrorWarning } from "components/Global-Error-Warning/GlobalErrorWarning";
import { FeedbackButton } from "components/Feedback-Button/FeedbackButton";
import "assets/styles/style.scss";
export const App = () => {
  return (
    <Router history={history}>
      <Route path="/">
        <GlobalErrorWarning></GlobalErrorWarning>
        <Navbar></Navbar>
      </Route>
      <Route path="/create-project" component={NewProjectPage} />
      <Route path="/project/link/:link">
        <FeedbackButton></FeedbackButton>
        <Projects></Projects>
      </Route>
      <Route path="/email/confirmed/:id" component={EmailConfirmPage} />
      <Route path="/test" component={Projects} />
    </Router>
  );
};
