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
export interface errorsType {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const loginService = userDataService().useLoginService();
  const validateService = userDataService().useValidateService();
  const [open, setOpen] = React.useState(false);
  const [userObj, setUserObj] = React.useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [
    mutateUserValidate,
    { status: userValidateStatus, error: userValidateError },
  ] = useMutation(
    (userDataObj: any) => {
      return validateService.userValidate(userDataObj);
    },
    {
      onSuccess: (validatedObj) => {
        const userObjectToStore: any = {
          userData: userObj,
          userPermission: validatedObj,
        };
        const stringifyUserObjectToStore = JSON.stringify(userObjectToStore);
        localStorage.setItem("userDataObj", stringifyUserObjectToStore);
        history.push("/home");
      },
      onError: (e) => {
        setOpen(true);
      },
    }
  );

  const [mutateLogin, { status: loginStatus, error: loginError }] = useMutation(
    (inputVal: any) => {
      return loginService.login(inputVal.email, inputVal.password);
    },
    {
      onSuccess: (userData) => {
        setUserObj(userData);
        mutateUserValidate(userData);
      },
      onError: (errorMessage: string) => {
        setLoginErrorMessage(errorMessage);
      },
    }
  );

  const formOnSubmit = (inputVal: any) => {
    mutateLogin(inputVal);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          User validate error
        </Alert>
      </Snackbar>
      <AuthPageContainer
        pageName="login"
        loading={loginStatus === "loading" || userValidateStatus === "loading"}
      >
        <Grid item xs={12} component={Paper} elevation={3} square>
          <div className={classes.paper}>
            <div className={classes.paperBox}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              {loginError && (
                <Alert className="mt-4 w-100" severity="error">
                  {loginErrorMessage}
                </Alert>
              )}

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
                      <Grid item xs={12}>
                        <TextInput
                          type="password"
                          name="password"
                          fullWidth
                          label="Password"
                        ></TextInput>
                      </Grid>
                      <Grid item xs={12} className="pt-1">
                        <Link className="normal-link" to="/forgot-password">
                          Forgot Password ?
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
                          Sign In
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
    </>
  );
};

export default LoginForm;
