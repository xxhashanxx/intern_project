import React from "react";
//require('react-dom');
import { post } from "axios";
import { API_MAIN_CONSTANT } from "../../../api/shared/config_path";
import { queryCache, useMutation } from "react-query";
import Alert from "@material-ui/lab/Alert";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import TransformIcon from "@material-ui/icons/Transform";
import { useParams, useHistory, Prompt } from "react-router-dom";
//import { useQuery, queryCache, useMutation } from "react-query";
import useInvestmentService from "../../../api/tmpInvestment/useInvestmentService";
class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      errorMsg: "",
      successMsg: "",
      warningMsg: "",
      status: "init",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  async onFormSubmit(e) {
    this.setState({
      errorMsg: "",
    });
    this.setState({
      successMsg: "",
      warningMsg: "",
      status: "loading",
    });
    e.preventDefault(); // Stop form submit
    const res = await this.fileUpload(this.state.file)
      .then((response) => {
        if (response.data.message === "warning") {
          let msg = "";
          for (var i = 0; i < response.data.data.length; i++) {
            msg = msg + JSON.stringify(response.data.data[i]);
          }
          this.setState({
            //successMsg: "warning",

            warningMsg: "warning: " + msg + " already exist",
            status: "warning",
          });
        } else {
          this.setState({
            successMsg: "Investment list retrieved successfully",
            warningMsg: "",
            status: "success",
          });
        }
        document.getElementById("simpleFileUploadForm").reset();
        //document.getElementById("fileF").reset();
        this.setState({ file: "" });
        return;
      })
      .catch((error) => {
        this.setState({
          errorMsg: error.response.data.message,
          successMsg: "",
          warningMsg: "",
          status: "error",
        });
        document.getElementById("simpleFileUploadForm").reset();
        this.setState({ file: "" });
        return error;
      });
    // console.log(res);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0], status: "init" });
  }

  fileUpload(file) {
    const userDataObj = localStorage.getItem("userDataObj");
    const url = API_MAIN_CONSTANT.ISSUE_INVESTMENT_UPLOAD;
    const formData = new FormData();
    formData.append("uploadfile", file);
    formData.append("issue_id", this.props.issueId);
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
      return post(url, formData, config);
    }
  }

  async transferData() {
    const userDataObj = localStorage.getItem("userDataObj");
    const url =
      API_MAIN_CONSTANT.INVESTMENTS_TRANSFER + "/" + this.props.issueId;
    let config = {};
    if (userDataObj) {
      const convertedObj = JSON.parse(userDataObj);

      const userData = convertedObj.userData;
      const userPermission = convertedObj.userPermission;
      const task = "investment.view";
      config = {
        headers: {
          "x-authorization": `${userPermission.id_token}`,
          "x-user-id": `${userData.id}`,
          "x-task": `${task}`,
        },
      };
      this.setState({
        errorMsg: "",
        successMsg: "",
        warningMsg: "",
        status: "transfering",
      });
      await post(url, {}, config);
      /*then((data) => {this.setState({
        status:"init"
      });});*/
      this.setState({
        status: "init",
      });
      return queryCache.refetchQueries("confirmedQuotationList").then(() => {});
    }
  }

  render() {
    const { errorMsg, successMsg, warningMsg, status } = this.state;
    return (
      <>
        {errorMsg !== "" && (
          <Alert className="w-100 mb-4" severity="error">
            {errorMsg}
          </Alert>
        )}
        {successMsg !== "" && (
          <Alert className="w-100 mb-4" severity="success">
            {successMsg}
          </Alert>
        )}
        {warningMsg !== "" && (
          <Alert className="w-100 mb-4" severity="warning">
            {warningMsg}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} className="form-row">
            <form onSubmit={this.onFormSubmit} id="simpleFileUploadForm">
              <div className="btn-row">
                <div className="btn-grid">
                  <input
                    type="file"
                    onChange={this.onChange}
                    accept=".xlsx"
                    id="fileF"
                  />
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    startIcon={
                      this.state.status === "loading" ? (
                        <CircularProgress size={20} />
                      ) : (
                        <PublishIcon />
                      )
                    }
                    disabled={
                      !this.state.file || this.state.status === "loading"
                    }
                  >
                    {this.state.status === "loading" ? "Uploading" : "Upload"}
                  </Button>
                </div>
                <div className="btn-grid">
                  <Button
                    color="primary"
                    //type="submit"
                    variant="contained"
                    onClick={() => this.transferData()}
                    //startIcon={<PublishIcon />}
                    disabled={
                      (successMsg === "" && warningMsg === "") ||
                      errorMsg !== "" ||
                      this.state.status === "transfering"
                    }
                    startIcon={
                      this.state.status === "transfering" ? (
                        <CircularProgress size={20} />
                      ) : (
                        <TransformIcon />
                      )
                    }
                  >
                    {this.state.status === "transfering"
                      ? "Transfering"
                      : "Transfer"}
                  </Button>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default SimpleReactFileUpload;
