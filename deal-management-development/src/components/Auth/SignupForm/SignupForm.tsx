import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import AuthPageContainer from "../../../containers/AuthPageContainer/AuthPageContainer";
import { Link } from "react-router-dom";
import fire from "../../../services/config/fire";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const [emailVal, setEmailValue] = useState("");
  const [passwordVal, setPasswordValue] = useState("");
  const [firstNameVal, setFirstNameValue] = useState("");
  const [lastNameVal, setLastNameValue] = useState("");
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(emailVal, passwordVal)
      .then((u) => {
        const user: any = fire.auth().currentUser;
        user
          .updateProfile({
            displayName: firstNameVal + lastNameVal,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function () {
            // An error happened.
          });
        // user
        //   .updateProfile({
        //     displayName: firstNameVal + lastNameVal,
        //   })
        //   .then(
        //     function () {

        //     },
        //     function (error) {

        //     }
        //   );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.currentTarget.name;
    const inputVal = e.currentTarget.value;
    if (nameVal === "email") {
      setEmailValue(inputVal);
    } else if (nameVal === "password") {
      setPasswordValue(inputVal);
    } else if (nameVal === "firstName") {
      setFirstNameValue(inputVal);
    } else if (nameVal === "lastName") {
      setLastNameValue(inputVal);
    }
  };
  return (
    <AuthPageContainer pageName="sign-up">
      <Grid item xs={12} component={Paper} elevation={3} square>
        <div className={classes.paper}>
          <div className={classes.paperBox}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={signUp}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    value={firstNameVal}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    value={lastNameVal}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    value={emailVal}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={passwordVal}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-start">
                <Grid item>
                  <Link className="normal-link" to="/login">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </AuthPageContainer>
  );
};
export default SignupForm;
