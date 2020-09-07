import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useInvestmentService = () => {
  const useDeleteInvestmentsService = () => {
    const deleteInvestments = async (issue_id: any) => {
      const task = "issue.list";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.TMPINVESTMENTS_DELETE + "/" + issue_id,
          axiosConfig
        )

        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteInvestments,
    };
  };
  const useTransferInvestmentService = () => {
    const transferInvestments = async (issue_id: string) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      //   console.log(createdBy);
      const task = "investment.transfer";
      const axiosConfig = GetAxiosConfig(task);

      await axios
        .post(
          API_MAIN_CONSTANT.INVESTMENTS_TRANSFER + "/" + issue_id,
          axiosConfig
        )

        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      transferInvestments,
    };
  };
  return {
    useTransferInvestmentService,
    useDeleteInvestmentsService,
  };
};

export default useInvestmentService;
