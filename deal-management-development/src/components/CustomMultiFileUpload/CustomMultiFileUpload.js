import React from "react";
import { post } from "axios";
import { API_MAIN_CONSTANT } from "../../api/shared/config_path";
import { Grid, Button, LinearProgress } from "@material-ui/core";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import PublishIcon from "@material-ui/icons/Publish";

class CustomMultiFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isLoading: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      document.getElementById("customMultiFileUploadForm").reset();
      this.setState({
        isLoading: false,
      });
      this.props.onFileUploadSuccess();
    });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fileUpload(file) {
    const userDataObj = localStorage.getItem("userDataObj");
    const url = API_MAIN_CONSTANT.DOCUMENTS_UPLOAD;
    const formData = new FormData();
    formData.append("model_name", this.props.modelName);
    formData.append("multi-files", file);
    formData.append("key_ref", this.props.keyRef + "^");

    this.setState({
      isLoading: true,
    });

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

  render() {
    return (
      <>
        {this.state.isLoading && <LinearProgress />}
        <div className="form-box">
          <form onSubmit={this.onFormSubmit} id="customMultiFileUploadForm">
            <Grid container spacing={3}>
              <Grid item xs={12} className="form-row">
                <FormItemLabel className="mb-0" text="Select Files" isLine />
              </Grid>
              <Grid item xs={12} className="form-row">
                <input type="file" onChange={this.onChange} multiple />
              </Grid>
              <Grid item xs={12} className="form-row">
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  startIcon={<PublishIcon />}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </>
    );
  }
}

export default CustomMultiFileUpload;
