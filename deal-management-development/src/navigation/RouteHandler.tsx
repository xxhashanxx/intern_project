import React, { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { ReactQueryDevtools } from "react-query-devtools";
import { browserHistory } from "./routerHistory";
import LoginPage from "./../pages/LoginPage";

import DashboardApp from "../containers/DashboardContainer/DashboardApp";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

const RouteHandler = () => {
  return (
    <>
      <Router history={browserHistory}>
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/">
              <DashboardApp />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default RouteHandler;
