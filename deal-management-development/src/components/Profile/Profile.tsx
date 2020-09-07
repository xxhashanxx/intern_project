import React from "react";
import {
  CardHeader,
  CardContent,
  Container,
  Grid,
  Card,
  Button,
  CircularProgress,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

import Page from "../../containers/Page/Page";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import { required } from "../../queries/FormValidation/ValidationMethods";
import { useMutation } from "react-query";
import useProfileService from "../../api/profile/useProfileService";
import { TextInput } from "../TextInput/TextInput";
export interface ProfileProps {}
const Profile = (props: ProfileProps) => {
  const userProfile = useProfileService();
  const userDataObj = localStorage.getItem("userDataObj");
  let userEmail = "";
  let userName = "";
  if (userDataObj) {
    const convertedObj = JSON.parse(userDataObj);
    userEmail = convertedObj.userData.email;
    userName = convertedObj.userData.user_name;
  }

  const [
    mutateUpdatePassword,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    (inputVal: any) => {
      //todo logged user email has to be enter
      return userProfile.updateProfile(inputVal.new_password);
    },
    {
      onSuccess: async (res) => {},
      onError: (t) => {
        console.log(t);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateUpdatePassword(inputVal);
  };

  return (
    <Page title="Profile">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={userName} subheader={userEmail} />
              <CardContent className="p-0">
                <div className="form-box-cont">
                  {/* {isCustomerLoading ? <LinearProgress /> : null} */}
                  <div className="form-box pb-5">
                    <FinalForm
                      keepDirtyOnReinitialize
                      onSubmit={formOnSubmit}
                      render={({
                        handleSubmit,
                        submitting,
                        pristine,
                        form,
                        values,
                      }) => (
                        <form
                          className="form"
                          noValidate
                          onSubmit={handleSubmit}
                          style={{ maxWidth: 400, margin: "auto" }}
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={12} className="form-row">
                              <FormItemLabel
                                className="mb-0"
                                text="Update your password"
                                isLine
                              />
                            </Grid>
                            <Grid item xs={12} className="form-row">
                              <TextInput
                                name="new_password"
                                label="New Password"
                                required
                                validate={required}
                                fullWidth
                                type="password"
                              />
                            </Grid>
                            <Grid item xs={12} className="form-row ">
                              <div className="btn-row flex-start">
                                <div className="btn-grid">
                                  <Button
                                    type={"submit"}
                                    variant="contained"
                                    color="primary"
                                    startIcon={
                                      addEditStatus === "loading" ? (
                                        <CircularProgress size={20} />
                                      ) : (
                                        <SaveIcon />
                                      )
                                    }
                                    disabled={
                                      addEditStatus === "loading" ||
                                      submitting ||
                                      pristine
                                    }
                                  >
                                    {addEditStatus === "loading"
                                      ? "Updating"
                                      : "Update"}
                                  </Button>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default Profile;
