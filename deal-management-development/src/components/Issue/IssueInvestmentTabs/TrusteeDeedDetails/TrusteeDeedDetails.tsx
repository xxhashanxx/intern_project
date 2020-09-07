import React, { useState } from "react";

import { Grid, Card, CardHeader, Button, CardContent } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FormDrawer from "../../../../containers/FormDrawer/FormDrawer";
import AddEditTrusteeDeedForm from "./AddEditTrusteeDeedForm";
import TrusteedeedlTable from "./TrusteeDeedDetailTable";

export interface TrusteeDeedDetailProps {}
const TrusteeDeedDetail = (props: TrusteeDeedDetailProps) => {
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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              //title="Add Trustee Deed Detail"
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
              <TrusteedeedlTable openDrawer={drawerOpen} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {isOpen && (
        <FormDrawer
          title={`${!formData ? "Add" : "Edit"} Trustee Deed Detail`}
          desc={`${!formData ? "Add" : "Edit"} Trustee Deed Detail desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <AddEditTrusteeDeedForm
            formData={formData}
            closeDrawer={() => toggleDrawer(false)}
          />
        </FormDrawer>
      )}
    </>
  );
};
export default TrusteeDeedDetail;
