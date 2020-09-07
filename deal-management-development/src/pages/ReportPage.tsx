import React, { useState } from "react";
import Page from "../containers/Page/Page";
import { Container, Grid, Card, CardContent } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import ReportCreateEditForm from "../components/Report/ReportCreateEditForm";

import { useStoreActions } from "../store";

import useIssuerService from "../api/issuer/useIssuerService";
import { useQuery } from "react-query";

export interface IssuerCreateEditPageProps {}
const IssuerCreateEditPage = (props: IssuerCreateEditPageProps) => {
  let { editId } = useParams();
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const updateIssuerId = useStoreActions(
    (actions) => actions.issuer.updateIssuerId
  );

  const { status: status1, data: data1, error: error1 } = useQuery(
    "issuerNextId",
    useIssuerService().useGetIssuerGetNextIdService
  );

  let issuerId = "";
  if (editId) {
    issuerId = editId;
  } else {
    if (status1 === "success" && data1 && data1.data) {
      issuerId = data1.data.issuer_id;
    }
  }
  updateIssuerId(issuerId);
  const onFormSubmitted = () => {
    setFormSubmitted(true);
    history.push("/issuer/edit/" + issuerId);
  };

  return (
    <Page title="Report">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent className="p-0">
                <ReportCreateEditForm formSubmitted={onFormSubmitted} />
               
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default IssuerCreateEditPage;
