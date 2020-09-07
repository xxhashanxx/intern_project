import React, { useEffect } from "react";
import WelcomeScreen from "../../components/WelcomeScreen/WelcomeScreen";
import { Switch, Route, useHistory } from "react-router-dom";
import DashboardContainer from "./DashboardContainer";
import Order from "../../pages/Order";
import ComingSoonPage from "../../pages/ComingSoonPage";
import AdminManagement from "../../pages/AdminManagement";
import RelationshipManagerPage from "../../pages/RelationshipManagerPage";
import TrusteePage from "../../pages/TrusteePage";
import CollateralPage from "../../pages/CollateralPage";
import Lawyerspage from "../../pages/LawyersPage";
import CustomerPage from "../../pages/CustomerPage";
import CustomerCreateEditPage from "../../pages/CustomerCreateEditPage";

import IssuerPage from "../../pages/IssuerPage";
import IssuerCreateEditPage from "../../pages/IssuerCreateEditPage";
import IssuePage from "../../pages/IssuePage";
import IssueCreateEditPage from "../../pages/IssueCreateEditPage";
import DefaultValuePage from "../../pages/DefaultValuePage";
import ProfilePage from "../../pages/ProfilePage";
import axios from "axios";
import AuditLogPage from "../../pages/AuditLogPage";
import ReportPage from "../../pages/ReportPage";
import MaturityInvestmentsPage from "../../pages/MaturityInvestmentsPage"
import TrusteeCreateEditPage from "../../pages/TrusteeCreateEditPage";
import { useMutation } from "react-query";
import userDataService from "../../api/auth/useAuthService";
import AuthExpireAlertBox from "./AuthExpireAlertBox";

export interface DashboardAppProps {}
const DashboardApp = (props: DashboardAppProps) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const history = useHistory();
  const validateService = userDataService().useValidateService();
  useEffect(() => {
    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (
          error.response.data.message === "TOKEN_EXPIRED" ||
          (error.response.data.errorCode &&
            error.response.data.errorCode.message === "auth/id-token-expired")
        ) {
          mutateUserOnTockenExpire();
          setAlertOpen(true);
        }
        throw error;
      }
    );
  }, []);

  const [
    mutateUserOnTockenExpire,
    { status: userValidateStatus, error: userValidateError },
  ] = useMutation(
    () => {
      const userDataObj = localStorage.getItem("userDataObj");
      let convertedObj = {
        userData: "",
      };
      if (userDataObj) {
        convertedObj = JSON.parse(userDataObj);
      }
      const userData = convertedObj.userData;

      return validateService.userValidate(userData);
    },
    {
      onSuccess: (validatedObj) => {
        const userDataObj = localStorage.getItem("userDataObj");
        let userObj = "";
        if (userDataObj) {
          const convertedObj = JSON.parse(userDataObj);
          userObj = convertedObj.userData;
        }

        const userObjectToStore: any = {
          userData: userObj,
          userPermission: validatedObj,
        };
        const stringifyUserObjectToStore = JSON.stringify(userObjectToStore);
        localStorage.setItem("userDataObj", stringifyUserObjectToStore);
        // history.push("/home");
      },
      onError: (e) => {},
    }
  );
  return (
    <>
      <AuthExpireAlertBox open={alertOpen} handleClose={handleAlertClose} />
      <DashboardContainer>
        <Switch>
          <Route exact path="/welcome">
            <WelcomeScreen />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/admin-management">
            <AdminManagement />
          </Route>
          <Route path="/user-management/relationship-manager">
            <RelationshipManagerPage />
          </Route>
          <Route path="/user-management/trustee">
            <TrusteePage />
          </Route>
          <Route path="/trustee/create">
            <TrusteeCreateEditPage />
          </Route>
          <Route path="/trustee/edit/:editId">
            <TrusteeCreateEditPage />
          </Route>
          <Route path="/user-management/collateral">
            <CollateralPage />
          </Route>
          <Route path="/user-management/lawyers">
            <Lawyerspage />
          </Route>
          <Route path="/customer/customer-list">
            <CustomerPage />
          </Route>
          <Route path="/customer/create">
            <CustomerCreateEditPage />
          </Route>
          <Route path="/customer/edit/:editId">
            <CustomerCreateEditPage />
          </Route>
          <Route path="/issuer/issuer-list">
            <IssuerPage />
          </Route>
          <Route path="/issuer/create">
            <IssuerCreateEditPage />
          </Route>
          <Route path="/issuer/edit/:editId">
            <IssuerCreateEditPage />
          </Route>
          <Route path="/issue/issue-list">
            <IssuePage />
          </Route>
          <Route path="/issue/create">
            <IssueCreateEditPage />
          </Route>
          <Route path="/issue/edit/:editId">
            <IssueCreateEditPage />
          </Route>
          <Route path="/default/default-list">
            <DefaultValuePage />
          </Route>
          <Route path="/report/balance-confirmation">
            <ReportPage />
          </Route>
          <Route path="/report/maturity-investments">
            <MaturityInvestmentsPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/audit-log">
            <AuditLogPage />
          </Route>
          <Route path="/coming-soon">
            <ComingSoonPage />
          </Route>
          <Route path="*">
            <WelcomeScreen />
          </Route>
        </Switch>
      </DashboardContainer>
    </>
  );
};
export default DashboardApp;
