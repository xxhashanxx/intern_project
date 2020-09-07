import React, { useState } from "react";
import { Grid, Button, LinearProgress,FormControl,InputLabel,Select } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import { required } from "../../queries/FormValidation/ValidationMethods";
import { TextInput } from "../TextInput/TextInput";
import Alert from "@material-ui/lab/Alert";
import { queryCache, useMutation } from "react-query";
import useDefaultValueService from "../../api/DefaultValue/useDefaultValueService";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface AddEditDefaultValueFormProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  roleName: string;
}
const AddEditDefaultValueForm = (props: AddEditDefaultValueFormProps) => {
  const createDefaultValueService = useDefaultValueService().useCreateDefaultValueService();
  const [isEditMode, setFormMode] = useState(false);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      console.log(formData);
      return {
        default_key: formData.key,
        default_value: formData.value,
      };
    } else {
      setFormMode(false);

      return { default_key: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));
  
  const [mutateAddEditDefaultValue,{status:addEditStatus,error:addEditError}] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createDefaultValueService.addEditDefaultValue(
        isEditMode,
        inputVal.default_key,
        inputVal.default_value,
        "login@gmail.com"
      );
    },
    {
      onSuccess: () => {
        //console.log('@@@@@ '+addEditError)
        return queryCache.refetchQueries("DefaultValueList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditDefaultValue(inputVal);
  };
  return (
    <div className="form-box-cont">
      {addEditStatus === "loading" && <LinearProgress />}

      { <ToastContainer />}
      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {(addEditStatus === "success") &&  (pristine=true)}
                {window.onbeforeunload = function() {
                  if(!(submitting||pristine))
                    return "";
                }}
              <Grid container spacing={3}>
              <Grid item xs={12}  className="form-row">
                    <FinalField
                      name="default_key"
                      
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            className="standard-select"
                            disabled={isEditMode}
                          >
                            <InputLabel
                              htmlFor="default_key"
                              className="standard-select-label"
                            >
                              Key 
                            </InputLabel>

                            <Select native {...input} required>
                            <option hidden>Select Value</option>
                              <option value="Attorney">Attorney</option>
                              <option value="Auditor">Auditor</option>
                              <option value="Customer">Investor Id Prefix</option>
                              <option value="Issue">Issue Id Prefix</option>
                              <option value="Issuer">Issuer Id Prefix</option>
                              <option value="DateFactor">Maturity Date Factor</option>
                            </Select>
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>

                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="default_value"
                    label="Default Value"
                    required
                    validate={required}
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

export default AddEditDefaultValueForm;
