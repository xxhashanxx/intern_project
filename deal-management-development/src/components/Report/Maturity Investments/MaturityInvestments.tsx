import React, { useState } from "react";
import Page from "../../../containers/Page/Page";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Button,
  CardContent,
} from "@material-ui/core";

import MaturityTable from "./MaturityInvestmentTable";

export interface MaturityProps {}
const MaturityInvestment = (props: MaturityProps) => {

  return (
    <Page title="Maturity Investments">
      <>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
              <CardHeader

              />
                <CardContent className="p-0">
                  <MaturityTable  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

      </>
    </Page>
  );
};
export default MaturityInvestment;
