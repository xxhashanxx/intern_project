import React from "react";
import { Container, Grid, Card } from "@material-ui/core";
export interface AlertImageCardContainerProps {
  children: JSX.Element;
}

const AlertImageCardContainer = (props: AlertImageCardContainerProps) => {
  return (
    <Container className="top-container">
      <Card className="mb-3">
        <div className="card-form-cont">
          <div className="card-form-wrap w-100">
            <Grid container spacing={3}>
              <Grid item xs={12} className="form-row">
                {props.children}
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default AlertImageCardContainer;
