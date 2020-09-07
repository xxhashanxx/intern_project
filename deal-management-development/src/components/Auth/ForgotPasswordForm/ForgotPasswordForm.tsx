import React from "react";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  makeStyles,
  Button,
  Snackbar,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import AuthPageContainer from "../../../containers/AuthPageContainer/AuthPageContainer";
import { Form as FinalForm } from "react-final-form";

import { useHistory, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import userDataService from "../../../api/auth/useAuthService";
import { TextInput } from "../../TextInput/TextInput";
import { useMutation, queryCache } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  paperBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));
export interface ForgotPasswordFormProps {}
const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const classes = useStyles();

  const formOnSubmit = (inputVal: any) => {
    //  mutateLogin(inputVal);
  };
  return (
    <AuthPageContainer pageName="Forgot Password" loading={false}>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <div className={classes.paper}>
          <div className={classes.paperBox}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            {/* {loginError && (
              <Alert className="mt-4 w-100" severity="error">
                {loginErrorMessage}
              </Alert>
            )} */}

            <FinalForm
              onSubmit={formOnSubmit}
              render={({ handleSubmit }) => (
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={3} className="my-4">
                    <Grid item xs={12}>
                      <TextInput
                        type="email"
                        name="email"
                        fullWidth
                        label="Email Address"
                      ></TextInput>
                    </Grid>
                    <Grid item xs={12} className="pt-1">
                      <span style={{ fontSize: "0.8rem", marginRight: "5px" }}>
                        Do you have your password?
                      </span>
                      <Link className="normal-link" to="/login">
                        Login
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type={"submit"}
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Reset Password
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </div>
        </div>
      </Grid>
    </AuthPageContainer>
  );
};
export default ForgotPasswordForm;
