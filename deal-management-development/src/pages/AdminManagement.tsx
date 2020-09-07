import React from "react";
import Page from "../containers/Page/Page";
import AddEditUsers from "../components/AdminManagement/AddEditUsers/AddEditUsers";
import { Container, Grid } from "@material-ui/core";

export interface AdminManagementProps {}
const AdminManagement = (props: AdminManagementProps) => {
  return (
    <Page title="Admin Management">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddEditUsers />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default AdminManagement;
