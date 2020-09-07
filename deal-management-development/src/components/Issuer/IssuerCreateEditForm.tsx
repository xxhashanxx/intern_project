import React, { useReducer } from "react";
import Alert from "@material-ui/lab/Alert";
import { Form as FinalForm } from "react-final-form";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";
import SaveIcon from "@material-ui/icons/Save";
import {
  required,
  isEmail,
} from "../../queries/FormValidation/ValidationMethods";
import { useParams, useHistory, Prompt } from "react-router-dom";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import { useQuery, useMutation, queryCache } from "react-query";
import { useStoreState } from "../../store";
import RelationshipManagerMultiSelect from "../RelationshipManagerMultiSelect/RelationshipManagerMultiSelect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useIssuerService from "../../api/issuer/useIssuerService";

export interface IssuerCreateEditFormProps {
  formSubmitted: () => void;
}

const IssuerCreateEditForm = (props: IssuerCreateEditFormProps) => {
  const history = useHistory();
  const createIssuerService = useIssuerService().useCreateIssuerService();
  const [formKey, updateKey] = useReducer(() => Date.now(), Date.now());
  let { editId } = useParams();
  const { status, data, error, refetch: refetchIssuer } = useQuery(
    "issuerDataById",
    editId,
    useIssuerService().useGetIssuerByIdService
  );

  /*window.onbeforeunload = function() {
    return "";
  }*/
  let formData = null;
  const issuerId = useStoreState((state) => state.issuer.issuerId);

  if (editId && status === "success" && data && data.data) {
    let issuerRmArray: any[] = [];

    data.data.issuer_rm.map((rmItem: any) => {
      return issuerRmArray.push(rmItem.rm_id);
    });
    formData = {
      issuer_id: data.data.issuer_id,
      address1: data.data.address1,
      address2: data.data.address2,
      contact_number1: data.data.contact_number1,
      contact_number2: data.data.contact_number2,
      contact_number3: data.data.contact_number3,
      issuer_name: data.data.issuer_name,
      issuer_rating: data.data.issuer_rating,
      issuer_rm: issuerRmArray,
      email: data.data.email,
      business_reg_no: data.data.business_reg_no,
      status: data.data.status,
    };
  } else {
    formData = { issuer_id: issuerId, issuer_rm: [] };
  }
  const [
    mutateAddEditIssuer,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await createIssuerService.addEditIssuer(
        editId ? true : false,
        inputVal.issuer_id,
        inputVal.issuer_name,
        inputVal.email,
        inputVal.issuer_rating,
        inputVal.business_reg_no,
        inputVal.issuer_rm,
        inputVal.contact_number1,
        inputVal.contact_number2,
        inputVal.contact_number3,
        inputVal.address1,
        inputVal.address2,
        "login@gmail.com"
      );
    },
    {
      onSuccess: async (res) => {
        props.formSubmitted();
        await refetchIssuer();
        updateKey();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditIssuer(inputVal);
  };

  const approveIssuerService = useIssuerService().useApproveIssuerService();
  const onApproveClick = (issuerDataItem: any) => {
    mutateApproveIssuer(issuerDataItem.issuer_id);
  };
  const [
    mutateApproveIssuer,
    { status: approveStatus, error: approveError },
  ] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveIssuerService.approveIssuer(approveId);
    },
    {
      onSuccess: () => {
        data.data.status = "Approved";

        //queryCache.refetchQueries("issuerPrelList").then(() => {});
        return queryCache.refetchQueries("issuerList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

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
                    else {
                      // console.log(addEditStatus);
                      return "";
                    }
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
                          color="primary"
                          startIcon={
                            approveStatus === "loading" ? (
                              <CircularProgress size={20} />
                            ) : (
                              <ThumbUpIcon />
                            )
                          }
                          disabled={
                            (data &&
                              data.data &&
                              data.data.status !== "Preliminary") ||
                            !data ||
                            addEditStatus === "loading" ||
                            approveStatus === "loading" ||
                            submitting ||
                            !pristine
                          }
                          onClick={() => onApproveClick(values)}
                        >
                          {approveStatus === "loading"
                            ? "Approving"
                            : "Approve"}
                        </Button>
                      </div>

                      <div className="btn-grid">
                        <Button
                          variant="contained"
                          color="default"
                          onClick={() => history.push("/issuer/issuer-list")}
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
                    <TextInput
                      name="issuer_id"
                      label="Issuer ID "
                      required
                      validate={required}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="issuer_name"
                      label="Issuer Name "
                      required
                      validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="email"
                      label="Email address "
                      //required
                      validate={isEmail}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="issuer_rating"
                      label="Issuer Ratings "
                      //required
                      // validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="business_reg_no"
                      label="Business Registration No"
                      ///required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <RelationshipManagerMultiSelect name="issuer_rm" />
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
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="contact_number3"
                      label="Contact number 3"
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
                      // required
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
export default IssuerCreateEditForm;
