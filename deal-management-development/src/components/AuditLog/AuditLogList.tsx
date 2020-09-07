import React, { useState } from "react";
import Page from "../../containers/Page/Page";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@material-ui/core";
import { TableSearchInput } from "../TableViewComponents/TableSearchInput";
import AuditLogTable from "./AuditLogTable";
import RefreshIcon from "@material-ui/icons/Cached";
import { queryCache } from "react-query";
export interface AuditLogListProps {}
const AuditLogList = (props: AuditLogListProps) => {
  const [searchVal, setSearchInput] = useState("");
  const refetchAuditList = () => {
    queryCache.refetchQueries("auditLogList");
  };
  return (
    <Page title="Audit Log">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <div className="btn-row">
                    <div className="btn-grid">
                      <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => refetchAuditList()}
                      >
                        Refetch List
                      </Button>
                    </div>
                  </div>
                }
              />
              <CardContent className="p-0">
                <AuditLogTable searchVal={searchVal} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default AuditLogList;
