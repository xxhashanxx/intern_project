import React, { useState } from "react";
import Page from "../../containers/Page/Page";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Button,
  CardContent,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DefaultValueTable from "./DefaultValueTable";
import { useHistory } from "react-router-dom";
import AddEditDefaultValueForm from "./AddEditDefaultValueForm";
import FormDrawer from "../../../src/containers/FormDrawer/FormDrawer";

export interface DefaultValueListProps {}
const DefaultValueList = (props: DefaultValueListProps) => {
  const history = useHistory();
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
    <Page title="Default Values">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
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
                <DefaultValueTable openDrawer={drawerOpen} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {isOpen && (
          <FormDrawer
            title={`${!formData ? "Add" : "Edit"} Default`}
            desc={`${!formData ? "Add" : "Edit"} Default desc`}
            closeDrawer={() => toggleDrawer(false)}
          >
            <AddEditDefaultValueForm
              formData={formData}
              closeDrawer={() => toggleDrawer(false)}
            />
          </FormDrawer>
        )}
      </Container>
      

    </Page>
  );
};
export default DefaultValueList;
