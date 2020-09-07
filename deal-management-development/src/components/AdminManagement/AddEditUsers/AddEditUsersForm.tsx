import React, { useState } from "react";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
} from "@material-ui/core";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import {
  required,
  composeValidators,
  isEmail,
} from "../../../queries/FormValidation/ValidationMethods";
import SaveIcon from "@material-ui/icons/Save";
import useAdminManagementService from "../../../api/adminManagement/users/useAdminManagementService";
import { TextInput } from "../../TextInput/TextInput";
import { useMutation, queryCache } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddEditUsersFormProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  roleName: string;
}

const AddEditUsersForm = (props: AddEditUsersFormProps) => {
  const createUserService = useAdminManagementService().useCreateUserService();
  const [isEditMode, setFormMode] = useState(false);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      return {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
    } else {
      setFormMode(false);

      return { username: "", role: "manager" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const [
    mutateAddEditUser,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    (inputVal: any) => {
      //todo logged user email has to be enter

      return createUserService.addEditUser(
        isEditMode,
        inputVal.username,
        inputVal.email,
        inputVal.password,
        inputVal.role
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("userList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditUser(inputVal);
  };

  return (
    <div className="form-box-cont">
      {addEditStatus === "loading" && <LinearProgress />}
      {<ToastContainer />}
      {/* {addEditError && (
        <Alert className="w-100" severity="error">
          {addEditError}
        </Alert>
      )} */}
      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {addEditStatus === "success" && (pristine = true)}
              {
                (window.onbeforeunload = function () {
                  if (!pristine) return "<div></div>";
                })
              }
              <Grid container>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="username"
                    label="User Name"
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="email"
                    label="Email Address "
                    required
                    validate={composeValidators(required, isEmail)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="password"
                    label="Password "
                    type="password"
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <FinalField
                    name="role"
                    render={({ input, meta }) => (
                      <>
                        <FormControl
                          variant="outlined"
                          size="small"
                          fullWidth
                          className="standard-select"
                        >
                          <InputLabel
                            htmlFor="select-role"
                            className="standard-select-label"
                          >
                            Select Role *
                          </InputLabel>
                          <Select native {...input} required>
                            <option value="manager">Manager</option>
                            <option value="adimin">Admin</option>
                            <option value="data_entry">Data Entry</option>
                            <option value="customer">Invester</option>
                          </Select>
                        </FormControl>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} className="form-row mt-4">
                  <div className="btn-row flex-end">
                    <div className="btn-grid">
                      <Button
                        onClick={props.closeDrawer}
                        variant="contained"
                        color="default"
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="btn-grid">
                      <Button
                        type={"submit"}
                        variant="contained"
                        color="primary"
                        disabled={submitting || pristine}
                        startIcon={<SaveIcon />}
                      >
                        Save
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
  );
};

export default AddEditUsersForm;
