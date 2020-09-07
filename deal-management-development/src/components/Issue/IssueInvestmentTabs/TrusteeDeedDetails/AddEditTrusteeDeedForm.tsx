import React, { useState } from "react";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import { Form as FinalForm } from "react-final-form";
import SaveIcon from "@material-ui/icons/Save";
import Alert from "@material-ui/lab/Alert";
import { queryCache, useMutation } from "react-query";
import useTrustdeedsService from "../../../../api/trustdeeds/useTrustdeedsService";
import { TextInput } from "../../../TextInput/TextInput";
import { required } from "../../../../queries/FormValidation/ValidationMethods";
import DatePickerInput from "../../../DatePickerInput/DatePickerInput";
import { useStoreState } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddEditTrusteeDeedFormProps {
  closeDrawer?: any;
  formData?: any;
}
export interface IFormData {
  roleName: string;
}
const AddEditTrusteeDeedForm = (props: AddEditTrusteeDeedFormProps) => {
  const createTrustdeedsService = useTrustdeedsService().useCreateTrustdeedsService();
  const [isEditMode, setFormMode] = useState(false);
  const issueId = useStoreState((state) => state.issue.issueId);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const getFormDataFromId = (formData: any) => {
    //console.log(formData);

    if (formData) {
      setFormMode(true);
      setSelectedDate(formData.deed_date);
      return {
        issue_id: formData.issue_id,
        deed_no: formData.deed_no,
        deed_date: formData.deed_date,
      };
    } else {
      setFormMode(false);

      return { collateral_id: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const [
    mutateAddEditTrusteedeed,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createTrustdeedsService.addEditTrustdeeds(
        isEditMode,
        issueId,
        inputVal.deed_no,
        selectedDate
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("trustdeedsList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditTrusteedeed(inputVal);
  };

  return (
    <div className="form-box-cont">
      {addEditStatus === "loading" && <LinearProgress />}

      {<ToastContainer />}
      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit, pristine, submitting }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {addEditStatus === "success" && (pristine = true)}
              {
                (window.onbeforeunload = function () {
                  if (!pristine) return "";
                })
              }
              <Grid container spacing={3}>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="deed_no"
                    label="Deed No "
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <DatePickerInput
                    label="Deed Date"
                    name="deed_date"
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
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
                        disabled={pristine || submitting}
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

export default AddEditTrusteeDeedForm;
