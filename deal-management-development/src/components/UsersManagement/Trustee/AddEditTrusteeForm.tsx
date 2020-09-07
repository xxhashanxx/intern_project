import React, { useReducer, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { TextInput, TextInputUpper } from "../../TextInput/TextInput";
import SaveIcon from "@material-ui/icons/Save";
import {
  required,
  isEmail,
} from "../../../queries/FormValidation/ValidationMethods";
import { useParams, useHistory, Prompt } from "react-router-dom";
import FormItemLabel from "../../FormItemLabel/FormItemLabel";
import { useQuery, useMutation, queryCache } from "react-query";
import { useStoreState } from "../../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTrusteeService from "../../../api/userManagement/trustee/useTrusteeService";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export interface AddEditTrusteeFormProps {
  formSubmitted: () => void;
}
const AddEditTrusteeForm = (props: AddEditTrusteeFormProps) => {
  const history = useHistory();
  const createTrusteeService = useTrusteeService().useCreateTrusteeService();
  const [formKey, updateKey] = useReducer(() => Date.now(), Date.now());

  const [isTrusteeLoading, setTrusteeLoading] = useState(false);

  let { editId } = useParams();

  const { status, data, error, refetch: refetchTrustee } = useQuery(
    ["trusteeDataById", editId],
    useTrusteeService().useGetTrusteeByIdService
  );

  let formData = null;
  const trusteeId = useStoreState((state) => state.trustee.trusteeId);

  if (editId && status === "success" && data && data.data) {

    formData = {
      trustee_id:  data.data.trustee_id,
      trustee_name:  data.data.trustee_name,
      email:  data.data.email,
      contact_person:  data.data.contact_person,
      contact_person_desig:  data.data.contact_person_desig,
      contact_number1:  data.data.contact_number1,
      contact_number2:  data.data.contact_number2,
      address_line1:  data.data.address_line1,
      address_line2:  data.data.address_line2,
    };
  } else {
    formData = {
      trustee_id: trusteeId,

    };
  }

  const [
    mutateAddEditTrustee,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    (inputVal: any) => {
      //todo logged user email has to be enter
      return createTrusteeService.addEditTrustee(
        editId ? true : false,
        inputVal.trustee_id,
        inputVal.trustee_name,
        inputVal.email,
        inputVal.contact_person,
        inputVal.contact_person_desig,
        inputVal.contact_number1,
        inputVal.contact_number2,
        inputVal.address_line1,
        inputVal.address_line2,
        "login@gmail.com"
      );
    },
    {
      onSuccess: async (res, mutatedData) => {
        console.log(mutatedData);
       history.push(`/trustee/edit/${mutatedData.trustee_id}`)
        
      },
      onError: (e) => {
        toast.error(e.message);
      },
      onMutate: () => {
        setTrusteeLoading(true);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditTrustee(inputVal);
  };
  
  return (
    <>
      {status === "error" && error && (
        <Alert className="w-100" severity="error">
          {error.message}
        </Alert>
      )}
      {<ToastContainer />}
      {/* {addEditStatus === "error" && addEditError && addEditError.message && (
        <Alert className="w-100" severity="error">
          {JSON.stringify(addEditError.message)}
        </Alert>
      )} */}
      <div className="form-box-cont">
        {/* {isTrusteeLoading ? <LinearProgress /> : null} */}
        <div className="form-box">
          <FinalForm
            key={formKey}
            keepDirtyOnReinitialize
            initialValues={formData}
            onSubmit={formOnSubmit}
            render={({ handleSubmit, submitting, pristine, form, values }) => (
              <form className="form" noValidate onSubmit={handleSubmit}>
                {
                  (window.onbeforeunload = function () {
                    if (
                      (addEditStatus === "success" ||
                        addEditStatus === "error" ||
                        addEditStatus === "idle") &&
                      !pristine
                    )
                      return "";
                  })
                }
                <Prompt
                  when={
                    (addEditStatus === "success" ||
                      addEditStatus === "error" ||
                      addEditStatus === "idle") &&
                    !pristine
                  }
                  message={
                    "There are unsaved changes. Do you want to continue?"
                  }
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} className="form-row mt-2">
                    <div className="btn-row flex-end">
                      
                      <div className="btn-grid">
                        <Button
                          variant="contained"
                          color="default"
                          onClick={() =>
                            history.push("/user-management/trustee/trustee")
                          }
                        >
                          Back
                        </Button>
                      </div>
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
                          {addEditStatus === "loading" ? "Submiting" : "Save"}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} className="form-row">
                    <FormItemLabel
                      className="mb-0"
                      text="Genaral Information"
                      isLine
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInputUpper
                      name="trustee_id"
                      label="Trustee ID "
                      required
                      validate={required}
                      fullWidth
                      disabled={editId}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="trustee_name"
                      label="Trustee Name "
                      required
                      validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} className="form-row">
                    <FormItemLabel className="mb-0" text="Contacts" isLine />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="contact_number1"
                      label="Contact number 1"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="contact_number2"
                      label="Contact number 2"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} className="form-row">
                    <FormItemLabel className="mb-0" text="Address" isLine />
                  </Grid>
                  <Grid item xs={12} md={6} className="form-row">
                    <TextInput
                      name="address1"
                      label="Address Line 1"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="form-row">
                    <TextInput
                      name="address2"
                      label="Address Line 2"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
};
export default AddEditTrusteeForm;
