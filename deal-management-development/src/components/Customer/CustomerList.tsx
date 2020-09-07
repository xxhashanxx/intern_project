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
import CustomerTable from "./CustomerTable";
import { useHistory } from "react-router-dom";
import { TableSearchInput } from "../TableViewComponents/TableSearchInput";

export interface CustomerListProps {}
const CustomerList = (props: CustomerListProps) => {
  const history = useHistory();
  const [searchVal, setSearchInput] = useState("");
  return (
    <Page title="Investor">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <div className="btn-row">
                    <div className="btn-grid">
                      <TableSearchInput onUpdate={setSearchInput} />
                    </div>
                    <div className="btn-grid">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => history.push("/customer/create")}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                }
              />
              <CardContent className="p-0">
                <CustomerTable searchVal={searchVal} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default CustomerList;
