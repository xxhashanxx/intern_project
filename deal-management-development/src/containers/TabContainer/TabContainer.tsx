import React from "react";
import { Container, Grid, Card } from "@material-ui/core";
import "./TabContainer.scss";
export interface TabContainerProps {
  children: JSX.Element;
}
const TabContainer = (props: TabContainerProps) => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>{props.children}</Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TabContainer;
