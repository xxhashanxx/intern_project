import React from "react";
import { Typography, Container } from "@material-ui/core";
export interface DashboardHeaderProps {
  title: string;
  description?: string;
}
const DashboardHeader = (props: DashboardHeaderProps) => {
  return (
    <div className="content-heading">
      <Container maxWidth="xl">
        <div className="dashboard-heading">
          <div className="heading-title-wrap">
            <div className="heading-title"> 
              <Typography
                variant="h3"
                color="textPrimary"
                component="h3"
                gutterBottom={false}
              >
                {props.title}
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardHeader;
