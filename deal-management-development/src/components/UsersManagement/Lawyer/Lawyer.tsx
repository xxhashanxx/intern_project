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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormDrawer from "../../../containers/FormDrawer/FormDrawer";
import AddEditLawyerForm from "./AddEditLawyerForm";
import LawyerTable from "./LawyerTable";

export interface LawyerProps {}
const Lawyer = (props: LawyerProps) => {
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
    <Page title="Lawyer">
      <>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  //title="Add Lawyer"
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
                  <LawyerTable openDrawer={drawerOpen} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {isOpen && (
          <FormDrawer
            title={`${!formData ? "Add" : "Edit"} Lawyer`}
            desc={`${!formData ? "Add" : "Edit"} lawyer desc`}
            closeDrawer={() => toggleDrawer(false)}
          >
            <AddEditLawyerForm
              formData={formData}
              closeDrawer={() => toggleDrawer(false)}
            />
          </FormDrawer>
        )}
      </>
    </Page>
  );
};
export default Lawyer;
