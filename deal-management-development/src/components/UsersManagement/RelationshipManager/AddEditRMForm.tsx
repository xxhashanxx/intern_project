import React, { useState } from "react";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { Form as FinalForm } from "react-final-form";
import SaveIcon from "@material-ui/icons/Save";
import {
  required,
  isEmail,
  mustBeNumber,
} from "../../../queries/FormValidation/ValidationMethods";
import { TextInput, TextInputUpper } from "../../TextInput/TextInput";
import { useMutation, queryCache } from "react-query";
import useRMService from "../../../api/userManagement/relationshipManager/useRMService";

import Alert from "@material-ui/lab/Alert";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
export interface AddEditRMFormProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  rm_id: string;
}

const AddEditRMForm = (props: AddEditRMFormProps) => {
  const createRMService = useRMService().useCreateRMService();
  const [isEditMode, setFormMode] = useState(false);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      return {
        rm_id: formData.rm_id,
        manager_name: formData.manager_name,
        email: formData.email,
        designation: formData.designation,
        contact_number: formData.contact_number,
        contact_number2: formData.contact_number2,
      };
    } else {
      setFormMode(false);

      return { rm_id: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const [mutateAddEditRM,{status:addEditRmStatus,error:addEditError}] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createRMService.addEditRM(
        isEditMode,
        inputVal.rm_id,
        inputVal.manager_name,
        inputVal.email,
        inputVal.designation,
        inputVal.contact_number,
        inputVal.contact_number2,
        "login@gmail.com"
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("rmList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditRM(inputVal);
  };

  return (
    <div className="form-box-cont">
      {addEditRmStatus === "loading" && <LinearProgress />}

      { <ToastContainer />}
      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {(addEditRmStatus === "success") &&  (pristine=true)}
                {window.onbeforeunload = function() {
                  if(!(pristine))
                    return "";
                }}
              <Grid container spacing={3}>
                <Grid item xs={12} className="form-row">
                  <TextInputUpper
                    name="rm_id"
                    label="RM ID"
                    required
                    validate={required}
                    fullWidth
                    disabled={isEditMode}
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="manager_name"
                    label="RM Name"
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="designation"
                    label="Designation"
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="email"
                    label="Email"
                    type="email"
                    //required
                    validate={isEmail}
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_number"
                    label="Contact number 1"
                    //required
                    validate={mustBeNumber}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_number2"
                    label="Contact number 2"
                    //required
                    validate={mustBeNumber}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row mt-2">
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

export default AddEditRMForm;
