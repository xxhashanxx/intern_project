import React, { useReducer } from "react";
import Alert from "@material-ui/lab/Alert";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import {
  Grid,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";
import SaveIcon from "@material-ui/icons/Save";
import { required } from "../../queries/FormValidation/ValidationMethods";
import { useParams, useHistory, Prompt } from "react-router-dom";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import { useQuery, useMutation, queryCache } from "react-query";
import { useStoreState } from "../../store";
import useCollateralService from "../../api/userManagement/collateral/useCollateralService";
import useTrusteeService from "../../api/userManagement/trustee/useTrusteeService";
import useLawyerService from "../../api/userManagement/lawyer/useLawyerService";
import useIssuerService from "../../api/issuer/useIssuerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useIssueService from "../../api/issue/useIssueService";
import numeral from "numeral";
import Avatar from '@material-ui/core/Avatar';

export interface IssueCreateEditFormProps {
  formSubmitted: () => void;
}
const IssueCreateEditForm = (props: IssueCreateEditFormProps) => {
  const history = useHistory();
  const createIssueService = useIssueService().useCreateIssueService();
  const [formKey, updateKey] = useReducer(() => Date.now(), Date.now());
  let { editId } = useParams();

  const { status, data, error, refetch: refetchIssue } = useQuery(
    "issueDataById",
    editId,
    useIssueService().useGetIssueByIdService
  );
  const {
    status: collateralStatus,
    data: collateralData,
    error: collateralError,
  } = useQuery(
    "collateralListCreateIssue",
    useCollateralService().useGetCollateralListService
  );

  const {
    status: trusteeStatus,
    data: trusteeData,
    error: trusteeError,
  } = useQuery(
    "trusteeListCreateIssue",
    useTrusteeService().useGetTrusteeListService
  );
  const {
    status: lawyerStatus,
    data: lawyerData,
    error: lawyerError,
  } = useQuery(
    "lawyerListCreateIssue",
    useLawyerService().useGetLawyerListService
  );
  const {
    status: issuerStatus,
    data: issuerData,
    error: issuerError,
  } = useQuery(
    "issuerListCreateIssue",
    useIssuerService().useGetIssuerListApprovedService
  );

  let formData = null;
  const issueId = useStoreState((state) => state.issue.issueId);
  const attorney = useStoreState((state) => state.issue.attorney);
  const auditor = useStoreState((state) => state.issue.auditor);
  const formatAmmount = (value: string) => {
    return value === undefined
      ? "" // make controlled
      : numeral(value).format("0,0.00");
  };

  if (editId && status === "success" && data && data.data) {
    formData = {
      issue_id: data.data.issue_id,
      issue_name: data.data.issue_name,
      issuer_id: data.data.issuer_id,
      account_name: data.data.account_name,
      account_number: data.data.account_number,
      amount: formatAmmount(data.data.amount),
      attorney: data.data.attorney,
      auditor: data.data.auditor,
      bank: data.data.bank,
      branch: data.data.branch,
      cash_cover: data.data.cash_cover,
      collateral_id: data.data.collateral_id,
      lawyer_id: data.data.lawyer_id,
      securitization_number: data.data.securitization_number,
      tenor: data.data.tenor,
      trustee_id: data.data.trustee_id,
      business_reg_no: data.data.business_reg_no,
      status: data.data.status,
    };
  } else {
    formData = { issue_id: issueId, attorney: attorney, auditor: auditor };
  }
  const [
    mutateAddEditIssue,
    { status: addEditStatus, error: addEditError },
  ] = useMutation(
    async (inputVal: any) => {
      const editedAmmount = inputVal.amount.replace(/[^0-9\.]+/g, "");

      return await createIssueService.addEditIssue(
        editId ? true : false,
        inputVal.issue_id,
        inputVal.issue_name,
        inputVal.issuer_id,
        inputVal.account_name,
        inputVal.account_number,
        editedAmmount,
        inputVal.attorney,
        inputVal.auditor,
        inputVal.bank,
        inputVal.branch,
        inputVal.cash_cover,
        inputVal.collateral_id,
        inputVal.lawyer_id,
        inputVal.securitization_number,
        inputVal.tenor,
        inputVal.trustee_id,
        "login@gmail.com"
      );
    },
    {
      onSuccess: async (res) => {
        props.formSubmitted();
        await refetchIssue();
        updateKey();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formOnSubmit = (inputVal: any) => {
    mutateAddEditIssue(inputVal);
  };

  const approveIssueService = useIssueService().useApproveIssueService();
  const onApproveClick = (issueDataItem: any) => {
    mutateApproveIssue(issueDataItem.issue_id);
  };
  const [
    mutateApproveIssue,
    { status: approveStatus, error: approveError },
  ] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveIssueService.approveIssue(approveId);
    },
    {
      onSuccess: () => {
        data.data.status = "Approved";
        return queryCache.refetchQueries("issueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const formatFunc = (value: string) => {
    const updatedVal =
      value === undefined
        ? "" // make controlled
        : numeral(value).format("0,0.00");
    return updatedVal === "NaN" ? "" : updatedVal;
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
        <div className="form-box">
          <FinalForm
            key={formKey}
            keepDirtyOnReinitialize
            // debug={console.log}
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
                    <div >
      <Chip
        label={data &&data.data &&data.data.status === "Preliminary"?"Preliminary":
               data &&data.data &&data.data.status === "Approved"?"Approved":"Closed"}
        clickable
        color={data &&data.data &&data.data.status === "Preliminary"?"default":
        data &&data.data &&data.data.status === "Approved"?"primary":"secondary"}
        
      />
    </div>
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
                          onClick={() => history.push("/issue/issue-list")}
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
                      name="issue_id"
                      label="Issue ID "
                      required
                      validate={required}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="issue_name"
                      label="Issue Name"
                      required
                      validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <FinalField
                      name="issuer_id"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="issuer_id"
                              className="standard-select-label"
                            >
                              Issuer ID *
                            </InputLabel>
                            {issuerStatus === "success" && (
                              <Select native {...input} required>
                                <option>Select Issuer </option>
                                {issuerData.data &&
                                  issuerData.data.map(
                                    (issuerItem: any, key: string) => {
                                      return (
                                        <option
                                          value={issuerItem.issuer_id}
                                          key={key}
                                        >
                                          {issuerItem.issuer_name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Select>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="bank"
                      label="Bank"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="branch"
                      label="Branch"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="account_name"
                      label="Account Name"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="account_number"
                      label="Account Number"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="amount"
                      label="Amount"
                      required
                      validate={required}
                      fullWidth
                      formatOnBlur={true}
                      format={formatFunc}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="attorney"
                      label="Attorney"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="auditor"
                      label="Auditor"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="cash_cover"
                      label="Cash Cover"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <FinalField
                      name="collateral_id"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="collateral_id"
                              className="standard-select-label"
                            >
                              Collateral ID
                            </InputLabel>
                            {collateralStatus === "success" && (
                              <Select native {...input} required>
                                <option>Select Collateral </option>
                                {collateralData.data &&
                                  collateralData.data.map(
                                    (collateralItem: any, key: string) => {
                                      return (
                                        <option
                                          value={collateralItem.collateral_id}
                                          key={key}
                                        >
                                          {collateralItem.collateral_name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Select>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <FinalField
                      name="lawyer_id"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="lawyer_id"
                              className="standard-select-label"
                            >
                              Lawyer ID
                            </InputLabel>

                            {lawyerStatus === "success" && (
                              <Select native {...input} required>
                                <option>Select Lawyer </option>

                                {lawyerData.data &&
                                  lawyerData.data.map(
                                    (lawyerItem: any, key: string) => {
                                      return (
                                        <option
                                          value={lawyerItem.lawyer_id}
                                          key={key}
                                        >
                                          {lawyerItem.lawyer_name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Select>
                            )}
                          </FormControl>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="form-row">
                    <TextInput
                      name="tenor"
                      label="Tenor"
                      //required
                      //validate={required}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} className="form-row">
                    <FinalField
                      name="trustee_id"
                      render={({ input, meta }) => (
                        <>
                          <FormControl
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="standard-select"
                          >
                            <InputLabel
                              htmlFor="trustee_id"
                              className="standard-select-label"
                            >
                              Trustee ID
                            </InputLabel>
                            {trusteeStatus === "success" && (
                              <Select native {...input} required>
                                <option>Select Trustee </option>

                                {trusteeData.data &&
                                  trusteeData.data.map(
                                    (trusteeItem: any, key: string) => {
                                      return (
                                        <option
                                          value={trusteeItem.trustee_id}
                                          key={key}
                                        >
                                          {trusteeItem.trustee_name}
                                        </option>
                                      );
                                    }
                                  )}
                              </Select>
                            )}
                          </FormControl>
                        </>
                      )}
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
export default IssueCreateEditForm;
