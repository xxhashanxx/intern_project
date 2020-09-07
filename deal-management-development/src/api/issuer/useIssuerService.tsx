import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useIssuerService = () => {
  const useGetIssuerListLobyService = async () => {
    const task = "issuer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUER_LIST_PREL, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useGetIssuerListApprovedService = async () => {
    const task = "issuer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUER_LIST_APPR, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useGetIssuerListService = async () => {
    const task = "issuer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUER_LIST, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useGetIssuerGetNextIdService = async () => {
    //if (id) {
      const task = "issuer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUER_NEXT_ID ,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
   // }
  };
  const useGetIssuerCountService = async () => {
    const task = "issuer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUER_COUNT, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useGetIssuerByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "issuer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUER_LIST + "/" + id,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDeleteIssuerService = () => {
    const deleteIssuer = async (delete_id: string) => {
      const task = "issuer.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.ISSUER_DELETE + "/" + delete_id,axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteIssuer,
    };
  };
  const useCreateIssuerService = () => {
    const addEditIssuer = async (
      isEditMode: boolean,
      issuer_id: string,
      issuer_name: string,
      email: string,
      issuer_rating: string,
      business_reg_no: string,
      issuer_rm: Array<String>,
      contact_number1: string,
      contact_number2: string,
      contact_number3: string,
      address1: string,
      address2: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "issuer.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.ISSUER_UPDATE,
            {
              issuer_id:issuer_id ===undefined ? null : issuer_id,
              issuer_name:issuer_name ===undefined ? null : issuer_name,
              email:email ===undefined ? null : email,
              issuer_rating:issuer_rating ===undefined ? null : issuer_rating,
              business_reg_no:business_reg_no ===undefined ? null : business_reg_no,
              issuer_rm,
              contact_number1:contact_number1 ===undefined ? null : contact_number1,
              contact_number2:contact_number2 ===undefined ? null : contact_number2,
              contact_number3:contact_number3 ===undefined ? null : contact_number3,
              address1:address1 ===undefined ? null : address1,
              address2:address2 ===undefined ? null : address2,
              created_by: createdBy,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error.response.data;
          });
      } else {
        const task = "issuer.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.ISSUER_CREATE,
            {
              issuer_id,
              issuer_name,
              email,
              issuer_rating,
              business_reg_no,
              issuer_rm,
              contact_number1,
              contact_number2,
              contact_number3,
              address1,
              address2,
              created_by: createdBy,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error.response.data;
          });
      }
    };
    return {
      addEditIssuer,
    };
  };
  const useApproveIssuerService = () => {
    const approveIssuer = async (aprrove_id: string) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(API_MAIN_CONSTANT.ISSUER_APPROVE + "/" + aprrove_id, {}, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      approveIssuer,
    };
  };
  return{
    useApproveIssuerService,
    useCreateIssuerService,
    useDeleteIssuerService,
    useGetIssuerByIdService,
    useGetIssuerCountService,
    useGetIssuerGetNextIdService,
    useGetIssuerListService,
    useGetIssuerListApprovedService,
    useGetIssuerListLobyService,

  }

};export default useIssuerService;


