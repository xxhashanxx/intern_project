import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  makeStyles,
  Grid,
  Box,
  Container,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useQuery, useMutation, queryCache } from "react-query";
import useIssueService from "../../api/issue/useIssueService";
import Alert from "@material-ui/lab/Alert";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Title from "../Demo/Title";

export interface IssueCardProps {}

const IssueCard = (props: IssueCardProps) => {
  const { status, data, error } = useQuery(
    "issueList",
    useIssueService().useGetIssueListLobyService
  );

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      //minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      { <ToastContainer />}
      {status === "success" && (
        <Container maxWidth="xl">
          <Title>
          <div>Recent Issues</div>
        </Title>
        <Grid container spacing={3}>
        {data &&
                data.map((issueDataItem: any, key: number) => {
                  var colorCode = "#4773c4";
                  if(issueDataItem.status === "Preliminary"){
                    colorCode = "#4e87f1";
                  } 
                  if(issueDataItem.status === "Cancelled"){
                    colorCode = "#405e97";
                  } 
                  return <Row  row={issueDataItem} backgroundColor={colorCode}/>;
                })}
               </Grid>
               </Container>
      )}
    </>
  );
};

export default IssueCard;

function Row(props: { row: any ,backgroundColor: any}) {
  const { row,backgroundColor } = props;
  const useStyles = makeStyles({
    root: {
      minWidth: "10vh",
      maxWidth:"100vh",
      marginBottom: 2,
      backgroundColor:"DeepSkyBlue",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 16,
      color:"white",
      fontWeight:700
    },
    amount: {
      fontSize: 25,
      color:"red",
      fontWeight:700
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  return (
   
      <Grid item xs={12} sm={4}>
    
        <Card className={classes.root} style={{ backgroundColor: backgroundColor} } >
          <CardContent>
            <Typography className={classes.title}  >
              {row.issue_name}
            </Typography>
            <Typography  className={classes.amount}>
              {row.amount}
            </Typography>
          </CardContent>
          
        </Card>
  
      </Grid>
           )
}





/*import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import FormDrawer from "../../containers/FormDrawer/FormDrawer";
import Page from "../../containers/Page/Page";
import useGetIssueListService from "../../api/issue/useGetIssueList";
import { useQuery } from "react-query";

export interface IssueCardProps {}
const IssueCard = (props: IssueCardProps) => {
  const { status, data, error } = useQuery("issueList", useGetIssueListService);
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

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (

      <>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
            {data && data.data &&
                data.data.map((collateralDataItem: any, key: number) => {
                  return (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>)})}
            </Grid>
          </Grid>
        </Container>
      </>

  );
};
export default IssueCard;*/
