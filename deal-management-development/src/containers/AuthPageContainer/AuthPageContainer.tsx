import React from "react";

import Grid from "@material-ui/core/Grid";

import "./AuthPageContainer.scss";
import { makeStyles } from "@material-ui/core/styles";

import companyLogo from "./../../assets/logo/company-logo-color.png";
import { useHistory } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));
interface AuthPageContainerProps {
  children: React.ReactNode;
  pageName: string;
  loading?: boolean;
}

const AuthPageContainer = (props: AuthPageContainerProps) => {
  const history = useHistory();
  const classes = useStyles();

  const userDataObj = localStorage.getItem("userDataObj");
  if (userDataObj) {
    history.push("/welcome");
  }
  return (
    <>
      <Grid container component="main" className={classes.root}>
        <div className="auth-cont">
          <div className="auth-wrap">
            <div className="auth-head">
              <div className="logo">
                <img
                  className="logo-img"
                  src={companyLogo}
                  alt="company logo"
                />
              </div>
            </div>

            <div className="auth-box">
              {props.loading && <LinearProgress />}
              {props.children}
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default AuthPageContainer;
