import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config_download";
var fileDownload = require('js-file-download');

const usePrintInvestmentsService = () => {

  const [errorMsg, setErrorMsg] = useState("");
  const createReport = async (
    issue_id: string,
    inv_id:[number],
    file_name:string,
    customer_id:string,
    balance_date: Date
  ) => {
    const userDataObj = localStorage.getItem("userDataObj");
    let createdBy = "";
    if (userDataObj) {
      const convertedObj = JSON.parse(userDataObj);
      createdBy = convertedObj.userData.email;
    }
    const task = "report.create";
    const axiosConfig = GetAxiosConfig(task);
    await axios
      .post(
        API_MAIN_CONSTANT.REPORT_CREATE,
        {
          issue_id,
          inv_id,
          file_name,
          customer_id,
          balance_date
        },
        axiosConfig
      )

      .then((response) => {
        if(file_name === "QuotationLetter"||file_name === "ConfirmationLetter"){
          fileDownload(response.data,file_name+'Report.zip');
        }
        else{
          fileDownload(response.data,file_name+'.pdf');
        }
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };
  return {
    createReport,
  };
};
export default usePrintInvestmentsService;
