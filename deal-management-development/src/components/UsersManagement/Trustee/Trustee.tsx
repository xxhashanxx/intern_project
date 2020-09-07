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
import TrusteeTable from "./TrusteeTable";
import { useHistory } from "react-router-dom";
import { TableSearchInput } from "../../TableViewComponents/TableSearchInput";

export interface TrusteeProps {}
const Trustee = (props: TrusteeProps) => {
  const history = useHistory();
  const [searchVal, setSearchInput] = useState("");
  return (
    <Page title="Trustee">
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
                        onClick={() => history.push("/trustee/create")}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                }
              />
              <CardContent className="p-0">
                <TrusteeTable searchVal={searchVal} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default Trustee;
