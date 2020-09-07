import React, { useState } from "react";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { Form as FinalForm } from "react-final-form";
import SaveIcon from "@material-ui/icons/Save";
import { required } from "../../../queries/FormValidation/ValidationMethods";
import { TextInput, TextInputUpper } from "../../TextInput/TextInput";
import Alert from "@material-ui/lab/Alert";
import { queryCache, useMutation } from "react-query";
import useCollateralService from "../../../api/userManagement/collateral/useCollateralService";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface AddEditCollateralFormProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  roleName: string;
}
const AddEditCollateralForm = (props: AddEditCollateralFormProps) => {
  const createCollateralService = useCollateralService().useCreateCollateralService();
  const [isEditMode, setFormMode] = useState(false);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      return {
        collateral_id: formData.collateral_id,
        collateral_name: formData.collateral_name,
      };
    } else {
      setFormMode(false);

      return { collateral_id: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const [mutateAddEditcollateral,{status:addEditStatus,error:addEditError}] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createCollateralService.addEditCollateral(
        isEditMode,
        inputVal.collateral_id,
        inputVal.collateral_name,
        "login@gmail.com"
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("collateralList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditcollateral(inputVal);
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
                  if(!(pristine))
                    return "";
                }}
              <Grid container spacing={3}>
                <Grid item xs={12} className="form-row">
                  <TextInputUpper
                    name="collateral_id"
                    label="Collateral ID "
                    required
                    validate={required}
                    fullWidth
                    disabled={isEditMode}
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="collateral_name"
                    label="Collateral Name "
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

export default AddEditCollateralForm;
