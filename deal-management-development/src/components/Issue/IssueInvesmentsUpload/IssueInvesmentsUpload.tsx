import React, { useState } from "react";
import axios from "axios";
import useIssueService from "../../../api/issue/useIssueService";
import { Form as FinalForm } from "react-final-form";
import { useMutation } from "react-query";
import { Grid, Button } from "@material-ui/core";
import { TextInput } from "../../TextInput/TextInput";
import { required } from "../../../queries/FormValidation/ValidationMethods";
import SaveIcon from "@material-ui/icons/Save";
import { useDropzone } from "react-dropzone";
import { useStoreState } from "../../../store";
import { API_MAIN_CONSTANT } from "../../../api/shared/config_path";
import SimpleReactFileUpload from "./SimpleFileUpload";
import FormItemLabel from "../../FormItemLabel/FormItemLabel";

export interface IssueInvesmentsUploadProps {}
const IssueInvesmentsUpload = (props: IssueInvesmentsUploadProps) => {
  const issueId = useStoreState((state) => state.issue.issueId);

  return (
    <div className="form-box-cont mb-4">
      <div className="form-box">
        <Grid container spacing={3}>
          <Grid item xs={12} className="form-row">
            <FormItemLabel className="mb-0" text="Upload XLSX file" isLine />
          </Grid>
          <Grid item xs={12} className="form-row">
            {/* <Accept /> */}
            <SimpleReactFileUpload issueId={issueId} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default IssueInvesmentsUpload;
function Accept(props: any) {
  const getIssueInvestmentUploadService = useIssueService().useGetIssueInvestmentUploadService();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx",
  });
  let fd = new FormData();
  const issueId = useStoreState((state) => state.issue.issueId);

  const acceptedFilesItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const onUploadFile = () => {
    const userDataObj = localStorage.getItem("userDataObj");
    let config = {};
    if (userDataObj) {
      const convertedObj = JSON.parse(userDataObj);

      const userData = convertedObj.userData;
      const userPermission = convertedObj.userPermission;
      const task = "customer.view";

      config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-authorization": `${userPermission.id_token}`,
          "x-user-id": `${userData.id}`,
          "x-task": `${task}`,
        },
      };
    }
    // const formData = new FormData();
    // formData.append("file", acceptedFiles);
    // console.log(acceptedFiles);

    axios
      .post(
        API_MAIN_CONSTANT.ISSUE_INVESTMENT_UPLOAD,
        {
          uploadfile: acceptedFiles,
          issue_id: issueId,
        },
        config
      )
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="dropzone-container">
      <div {...getRootProps({ className: "dropzone  p-3" })}>
        <input {...getInputProps()} />
        <div>Drag 'n' drodiv some files here, or click to select files</div>
        <em>(Only .xlsx will be accepted)</em>
      </div>
      {acceptedFilesItems && (
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFilesItems}</ul>
        </aside>
      )}

      <div>
        <div className="btn-row flex-end">
          <div className="btn-grid">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => onUploadFile()}
            >
              Upload and preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
