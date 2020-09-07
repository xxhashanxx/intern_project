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
import RMTable from "./RMTable";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import AddEditRMForm from "./AddEditRMForm";

export interface RelationshipManagerProps {}
const RelationshipManager = (props: RelationshipManagerProps) => {
  const [isOpen, toggleDrawer] = useState(false);
  const [formData, setFromData] = useState(null);
  const drawerOpen = (formDataItem?: any) => {
    if (formDataItem) {
      setFromData(formDataItem);
    } else {
      setFromData(null);
    }

    toggleDrawer(true);
  };
  return (
    <Page title="Relationship Manager">
      <>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  //title="Add Relationship Manager"
                  //subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
                  action={
                    <div className="btn-grid">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => drawerOpen()}
                      >
                        Add
                      </Button>
                    </div>
                  }
                />
                <CardContent className="p-0">
                  <RMTable openDrawer={drawerOpen} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {isOpen && (
          <FormDrawer
            title={`${!formData ? "Add" : "Edit"} Relationship Manager`}
            desc={`${!formData ? "Add" : "Edit"} RM desc`}
            closeDrawer={() => toggleDrawer(false)}
          >
            <AddEditRMForm
              formData={formData}
              closeDrawer={() => toggleDrawer(false)}
            />
          </FormDrawer>
        )}
      </>
    </Page>
  );
};
export default RelationshipManager;
