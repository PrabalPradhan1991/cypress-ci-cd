import React from "react";
import { ProjectButton } from "./components/ProjectButton";
import Page, { Grid, GridColumn } from "@atlaskit/page";

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Page>
        <Grid layout="fluid">
          <GridColumn medium={3}></GridColumn>
          <GridColumn medium={6}>
            <ProjectButton></ProjectButton>
          </GridColumn>
          <GridColumn medium={3}></GridColumn>
        </Grid>
      </Page>
    </div>
  );
};
