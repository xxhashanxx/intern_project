import React, { useState } from "react";
import { required, isEmail } from "../../../queries/FormValidation/ValidationMethods";
import Alert from "@material-ui/lab/Alert";
import { LinearProgress, Grid, Button } from "@material-ui/core";
import { Form as FinalForm } from "react-final-form";
import { TextInput } from "../../TextInput/TextInput";
import SaveIcon from "@material-ui/icons/Save";
import useIssuerContactService from "../../../api/issuerContact/useIssuerContactService";
import { useMutation, queryCache } from "react-query";
import { useStoreState } from "../../../store";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface IssuerContactFormProps {
  closeDrawer?: any;
  formData?: any;
}
const IssuerContactForm = (props: IssuerContactFormProps) => {
  const createIssuerContactService = useIssuerContactService().useCreateIssuerContactService();
  const [isEditMode, setFormMode] = useState(false);
  const [contactId, setContactId] = useState(-1);
  const issuerId = useStoreState((state) => state.issuer.issuerId);

  const getFormDataFromId = (formData: any) => {
    if (formData) {
      setFormMode(true);
      setContactId(formData.id);
      return {
        contact_person: formData.contact_person,
        contact_designation: formData.contact_designation,
        contact_number: formData.contact_number,
        email: formData.email,
        //todo
      };
    } else {
      setFormMode(false);

      return { contact_person: "" };
    }
  };
  const [formData] = useState(() => getFormDataFromId(props.formData));

  const [mutateAddEditIssuerContact,{status,error}] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createIssuerContactService.addEditIssuerConatct(
        isEditMode,
        issuerId,
        inputVal.contact_person,
        inputVal.contact_number,
        inputVal.email,
        inputVal.contact_designation,
        "login@gmail.com",
        contactId
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issuerContactList").then(() => {
          props.closeDrawer(true);
        });
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditIssuerContact(inputVal);
  };
  return (
    <div className="form-box-cont">
      {status === "loading" && <LinearProgress />}

      { <ToastContainer />}

      <div className="form-box">
        <FinalForm
          initialValues={formData}
          onSubmit={formOnSubmit}
          render={({ handleSubmit,pristine,submitting }) => (
            <form className="form" noValidate onSubmit={handleSubmit}>
              {(status === "success") &&  (pristine=true)}
                {window.onbeforeunload = function() {
                  if(!(pristine))
                    return "";
                }}
              <Grid container spacing={3}>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_person"
                    label="Contact Person"
                    required
                    validate={required}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_designation"
                    label="Contact Designation"
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
                    required
                    validate={isEmail}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="form-row">
                  <TextInput
                    name="contact_number"
                    label="Contact Number"
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
                        disabled={pristine||submitting }
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
export default IssuerContactForm;
