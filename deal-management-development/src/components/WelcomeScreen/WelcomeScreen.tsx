import React from "react";
import { Container, Grid, Paper, LinearProgress } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../containers/Page/Page";
import CustomerTableLoby from "../Customer/CustomerTableLoby";
import IssueTableOngoingDetails from "../Issue/IssueTableOngoingDetails";
import IssueTableLoby from "../Issue/IssueTableLoby";
import ConutChart from "../Chart/Charts";
import useIssuerService from "../../api/issuer/useIssuerService";
import { useQuery} from "react-query";
import Alert from "@material-ui/lab/Alert";
import useIssueService from "../../api/issue/useIssueService";
import useCustomerService from "../../api/customer/useCustomerService";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
}));
const WelcomeScreen = () => {
//-----------------------------------------------------
  const { status:statusIssuer, data:dataIssuer, error:errorIssuer } = useQuery(
    "IssuerCountList",
    useIssuerService().useGetIssuerCountService
    
  );
  let issuerCountArray: any[] = [];
  if (statusIssuer === "success" && dataIssuer && dataIssuer.data) {
    issuerCountArray=[dataIssuer.data.approvedCount,dataIssuer.data.preliminaryCount]
  }
//------------------------------------------------------------
  const { status:statusIssue, data:dataIssue, error:errorIssue } = useQuery(
    "IssueCountList",
    useIssueService().useGetIssueCountService
    
  );
  let issueCountArray: any[] = [];
  if (statusIssue === "success" && dataIssue && dataIssue.data) {
      issueCountArray=[dataIssue.data.approvedCount,dataIssue.data.preliminaryCount,dataIssue.data.cancelledCount]
  }
//-----------------------------------------------------------
  const { status:statusCustomer, data:dataCustomer, error:errorCustomer } = useQuery(
    "CustomerCountList",
    useCustomerService().useGetCustomerCountService
    
  );
  let customerCountArray: any[] = [];
  if (statusCustomer === "success" && dataCustomer && dataCustomer.data) {
      customerCountArray=[dataCustomer.data.approvedCount,dataCustomer.data.preliminaryCount]
  }
//---------------------------------------------
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Page title="Welcome">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Chart */}
          {/* <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid> */}
          {/* Recent Deposits */}
          {/* <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid> */}
          {/* Recent Orders */}
          
          <Grid item xs={12} >
            <Paper className={classes.paper}>
            <IssueTableLoby searchVal={''} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <IssueTableOngoingDetails searchVal={''} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
            {statusCustomer === "loading" && <LinearProgress />}
            {statusCustomer === "error" && errorCustomer && (
              <Alert severity="error">{errorCustomer.message}</Alert>
            )}
            {statusCustomer === "success" && ( 
              <ConutChart name={"Investors"} value={customerCountArray} labels={["Approved","Preliminary"]}/>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
            {statusIssuer === "loading" && <LinearProgress />}
            {statusIssuer === "error" && errorIssuer && (
              <Alert severity="error">{errorIssuer.message}</Alert>
            )}
            {statusIssuer === "success" && ( 
                <ConutChart name={"Issuer"} value={issuerCountArray} labels={["Approved","Preliminary"]}/>
            )}    
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
            {statusIssue === "loading" && <LinearProgress />}
            {statusIssue === "error" && errorIssue && (
              <Alert severity="error">{errorIssue.message}</Alert>
            )}
            {statusIssue === "success" && ( 
              <ConutChart name={"Issue"} value={issueCountArray} labels={["Approved","Preliminary","Closed"]} />
            )}
            </Paper>
          </Grid>


          
          
          {/* <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Buttons />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextFields />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <AlertBox />
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default WelcomeScreen;
