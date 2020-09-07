import React, { useState } from "react";
import Page from "../containers/Page/Page";
import { Container, Grid, Card, CardContent } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import IssueCreateEditForm from "../components/Issue/IssueCreateEditForm";
import { useStoreActions } from "../store";
import IssueInvesmentsUpload from "../components/Issue/IssueInvesmentsUpload/IssueInvesmentsUpload";
import IssueInvestmentTabs from "../components/Issue/IssueInvestmentTabs/IssueInvestmentTabs";

import { useQuery } from "react-query";
import useIssueService from "../api/issue/useIssueService";
import IssueDocumentList from "../components/Issue/IssueDocument/IssueDocumentList";

export interface IssueCreateEditPageProps {}
const IssueCreateEditPage = (props: IssueCreateEditPageProps) => {
  let { editId } = useParams();
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const updateIssueId = useStoreActions(
    (actions) => actions.issue.updateIssueId
  );
  const updateAttorney = useStoreActions(
    (actions) => actions.issue.updateAttorney
  );
  const updateAuditor = useStoreActions(
    (actions) => actions.issue.updateAuditor
  );

  const { status: status1, data: data1, error: error1 } = useQuery(
    "issueDefVal",
    useIssueService().useGetIssueDefValService
  );

  let issueId = "";
  let auditor = "";
  let attorney = "";
  if (editId) {
    issueId = editId;
  } else {
    //issueId = uuid.v4();
    if (status1 === "success" && data1 && data1.data) {
      //    console.log(data1.data.issue_id);
      auditor = data1.data.auditor;
      attorney = data1.data.attorney;
      issueId = data1.data.issue_id;
    }
  }
  updateIssueId(issueId);
  updateAttorney(attorney);
  updateAuditor(auditor);

  const onFormSubmitted = () => {
    setFormSubmitted(true);
    history.push("/issue/edit/" + issueId);
  };

  return (
    <Page title="Issue">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader
                title={editId ? "Edit Issue" : "Add Issue"}
                subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
                action={
                  <div className="btn-grid">
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<ArrowBackIosIcon />}
                      onClick={() => history.push("/issue/issue-list")}
                    >
                      Back to list
                    </Button>
                  </div>
                }
              /> */}

              <CardContent className="p-0">
                <IssueCreateEditForm formSubmitted={onFormSubmitted} />

                <div id="issueBottomForms">
                  {editId || isFormSubmitted ? (
                    <>
                      <IssueInvesmentsUpload />

                      <IssueInvestmentTabs />
                      <IssueDocumentList />
                    </>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default IssueCreateEditPage;
