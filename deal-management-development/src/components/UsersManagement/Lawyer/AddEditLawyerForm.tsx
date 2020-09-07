import React, { useState } from "react";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { Form as FinalForm } from "react-final-form";
import SaveIcon from "@material-ui/icons/Save";
import { required, isEmail } from "../../../queries/FormValidation/ValidationMethods";
import { TextInput, TextInputUpper } from "../../TextInput/TextInput";
import useLawyerService from "../../../api/userManagement/lawyer/useLawyerService";
import { useMutation, queryCache } from "react-query";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface AddEditLawyerProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  roleName: string;
}
const AddEditLawyer = (props: AddEditLawyerProps) => {
  const createLawyerService = useLawyerService().useCreateLawyerService();
  const [isEditMode, setFormMode] = useState(false);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      return {
        lawyer_id: formData.lawyer_id,
        lawyer_name: formData.lawyer_name,
        email: formData.email,
        contact_person: formData.contact_person,
        contact_person_desig: formData.contact_person_desig,
        contact_number1: formData.contact_number1,
        contact_number2: formData.contact_number2,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
      };
    } else {
      setFormMode(false);

      return { lawyer_id: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const [mutateAddEditlawyer,{status:addEditStatus,error:addEditError}] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createLawyerService.addEditLawyer(
        isEditMode,
        inputVal.lawyer_id,
        inputVal.lawyer_name,
        inputVal.email,
        inputVal.contact_number1,
        inputVal.contact_number2,
        "login@gmail.com"
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("lawyerList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditlawyer(inputVal);
  };
  return (
    <div className="form-box-cont">
      {addEditStatus === "loading" && <LinearProgress />}
      { <ToastContainer />}
      {/* {addEditError && (
        <Alert className="w-100" severity="error">
          {addEditError.message}
        </Alert>
      )} */}
      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {(addEditStatus === "success") &&  (pristine=true)}
                {window.onbeforeunload = function() {
                  if(!(pristine))
                    return "";

                }}
              <Grid container spacing={3}>
                <Grid item xs={12} className="form-row">
                  <TextInputUpper
                    name="lawyer_id"
                    label="Lawyer ID"
                    required
                    validate={required}
                    fullWidth
                    disabled={isEditMode}
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="lawyer_name"
                    label="Lawyer Name"
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
                    name="contact_number1"
                    label="Contact number 1"
                    //required
                    //validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_number2"
                    label="Contact number 2"
                    //required
                    //validate={required}
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

export default AddEditLawyer;
