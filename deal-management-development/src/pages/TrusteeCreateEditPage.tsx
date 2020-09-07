import React, { useState } from "react";
import Page from "../containers/Page/Page";
import { Container, Grid, Card, CardContent } from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";

//import TrusteeContactList from "../components/Trustee/TrusteeContact/TrusteeContactList";

import { useStoreActions } from "../store";

//import useTrusteeService from "../api/trustee/useTrusteeService";
import { useQuery } from "react-query";
import AddEditTrusteeForm from "../components/UsersManagement/Trustee/AddEditTrusteeForm";
import TrusteeContactList from "../components/UsersManagement/Trustee/TrusteeContact/TrusteeContactList";

export interface TrusteeCreateEditPageProps {}
const TrusteeCreateEditPage = (props: TrusteeCreateEditPageProps) => {
  let { editId } = useParams();
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const updateTrusteeId = useStoreActions(
    (actions) => actions.trustee.updateTrusteeId
  );


  let trusteeId = "";
  if (editId) {
    trusteeId = editId;
  } 
  updateTrusteeId(trusteeId); //todo error in console
  const onFormSubmitted = () => {
    setFormSubmitted(true);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ '+trusteeId)
    history.push("/trustee/edit/" + trusteeId);
  };

  return (
    <Page title="Trustee">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader
                title={editId ? "Edit Trustee" : "Add Trustee"}
                subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
                action={
                  <div className="btn-grid">
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<ArrowBackIosIcon />}
                      onClick={() => history.push("/trustee/trustee-list")}
                    >
                      Back to list
                    </Button>
                  </div>
                }
              /> */}
              <CardContent className="p-0">
                <AddEditTrusteeForm formSubmitted={onFormSubmitted} />
                <div id="trusteeBottomForms">
                  {editId || isFormSubmitted ? (
                    <>
                      <TrusteeContactList /> 
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
export default TrusteeCreateEditPage;
