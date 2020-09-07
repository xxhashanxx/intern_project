import React, { useEffect, useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { required } from "../../../queries/FormValidation/ValidationMethods";
import SaveIcon from "@material-ui/icons/Save";
import store, { useStoreActions, useStoreState } from "../../../store";

export interface AddEditUserRolesFormProps {
  closeDrawer?: any;
  editId: number;
}
export interface IFormData {
  roleName: string;
}
const getFormDataFromId = (editId: number) => {
  const userRolesData = store.getState().userRoles.userRolesData;

  let roleNameForSet = "";
  //  console.log(editId);

  if (editId !== 0) {
    let result = userRolesData.filter((data) => data.id == editId);
    roleNameForSet = result[0].userRole;
  }
  return { roleName: roleNameForSet };
};
const AddEditUserRolesForm = (props: AddEditUserRolesFormProps) => {
  const [formData] = useState(() => getFormDataFromId(props.editId));

  const addEditUserRoles = useStoreActions(
    (actions) => actions.userRoles.addEditUserRoles
  );

  const userRolesData = useStoreState((state) => state.userRoles.userRolesData);

  const formOnSubmit = (inputVal: any) => {
    let roleId = props.editId !== 0 ? props.editId : userRolesData.length + 1;

    const userRole = {
      id: roleId,
      userRole: inputVal.roleName,
    };
    addEditUserRoles(userRole);
    props.closeDrawer(true);
  };

  return (
    <div className="form-box">
      <FinalForm
        onSubmit={formOnSubmit}
        initialValues={formData}
        render={({ handleSubmit }) => (
          <form className="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FinalField
                  name="roleName"
                  validate={required}
                  render={({ input, meta }) => (
                    <>
                      <TextField
                        {...input}
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Role Name"
                        type="text"
                        error={meta.touched && meta.error}
                        helperText={
                          meta.touched &&
                          meta.error && <span>{meta.error}</span>
                        }
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="btn-row">
                  <div className="btn-grid">
                    <Button
                      onClick={props.closeDrawer}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="btn-grid">
                    <Button
                      type={"submit"}
                      variant="contained"
                      color="primary"
                      size="small"
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
  );
};

export default AddEditUserRolesForm;
