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
import useCustomerService from "../../api/customer/useCustomerService";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export interface CustomerCreateEditFormProps {
  formSubmitted: () => void;
}
const CustomerCreateEditForm = (props: CustomerCreateEditFormProps) => {
  const history = useHistory();
  const createCustomerService = useCustomerService().useCreateCustomerService();
  const [formKey, updateKey] = useReducer(() => Date.now(), Date.now());

  const [isCustomerLoading, setCustomerLoading] = useState(false);

  let { editId } = useParams();

  const { status, data, error, refetch: refetchCustomer } = useQuery(
    ["customerDataById", editId],
    useCustomerService().useGetCustomerByIdService
  );

  let formData = null;
  const customerId = useStoreState((state) => state.customer.customerId);

  if (editId && status === "success" && data && data.data) {
    let customerRmArray: any[] = [];

    data.data.customer_rm.map((rmItem: any) => {
      return customerRmArray.push(rmItem.rm_id);
    });
    formData = {
      customer_id: data.data.customer_id,
      address1: data.data.address1,
      address2: data.data.address2,
      contact_number1: data.data.contact_number1,
      contact_number2: data.data.contact_number2,
      contact_number3: data.data.contact_number3,
      customer_name: data.data.customer_name,
      customer_type: data.data.customer_type,
      customer_rm: customerRmArray,
      email: data.data.email,
      nic_passport_br: data.data.nic_passport_br,
      status: data.data.status,
    };
  } else {
    formData = {
      customer_id: customerId,
      customer_type: "Institutional",
      customer_rm: [],
    };
  }

  const [
    mutateAddEditCustomer,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    (inputVal: any) => {
      //todo logged user email has to be enter
      return createCustomerService.addEditCustomer(
        editId ? true : false,
        inputVal.customer_id,
        inputVal.customer_name,
        inputVal.email,
        inputVal.customer_type,
        inputVal.nic_passport_br,
        inputVal.customer_rm,
        inputVal.contact_number1,
        inputVal.contact_number2,
        inputVal.contact_number3,
        inputVal.address1,
        inputVal.address2,
        "login@gmail.com"
      );
    },
    {
      onSuccess: async (res, mutatedData) => {
        // console.log(res, mutatedData);

        props.formSubmitted();
        await refetchCustomer();
        setCustomerLoading(false);
        //queryCache.setQueryData(["customerDataById", editId], mutatedData);
        updateKey();
      },
      onError: (e) => {
        toast.error(e.message);
      },
      onMutate: () => {
        setCustomerLoading(true);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditCustomer(inputVal);
  };
  const approveCustomerService = useCustomerService().useApproveCustomerService();
  const onApproveClick = (customerDataItem: any) => {
    mutateApproveCustomer(customerDataItem.customer_id);
  };
  const [
    mutateApproveCustomer,
    { status: approveStatus, error: approveError },
  ] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveCustomerService.approveCustomer(approveId);
    },
    {
      onSuccess: (inputVal: any) => {
        data.data.status = "Approved";
        return queryCache.refetchQueries("customerList").then(() => {});
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
        {/* {isCustomerLoading ? <LinearProgress /> : null} */}
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
                          onClick={() =>
                            history.push("/customer/customer-list")
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
                    <TextInput
                      name="customer_id"
                      label="Investor ID "
                      required
                      validate={required}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="customer_name"
                      label="Investor Name "
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
                    <FinalField
                      name="customer_type"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="customer-type"
                              className="standard-select-label"
                            >
                              Invester Type *
                            </InputLabel>

                            <Select native {...input} required>
                              <option value="Institutional">
                                Institutional
                              </option>
                              <option value="Individual">Individual</option>
                              <option value="Joint">Joint</option>
                            </Select>
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="nic_passport_br"
                      label="BR No/NIC/Passport No"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <RelationshipManagerMultiSelect name="customer_rm" />
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
export default CustomerCreateEditForm;
