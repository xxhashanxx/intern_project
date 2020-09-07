import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useIssuerContactService = () => {
  const useGetIssuerContactListService = async (key: string, issuerid: any) => {
    if (issuerid) {
      const task = "iccp.list";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUER_CONTACT_LIST + "/" + issuerid,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useGetIssuerContactByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "iccp.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUER_CONTACT_LIST + "/" + id,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDeleteIssuerContactService = () => {
    const deleteIssuerContact = async (issuer_id: string, delete_id: string) => {
      const task = "iccp.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.ISSUER_CONTACT_DELETE +
            "/" +
            issuer_id +
            "/" +
            delete_id,
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
      deleteIssuerContact,
    };
  };
  const useCreateIssuerContactService = () => {
    const addEditIssuerConatct = async (
      isEditMode: boolean,
      issuer_id: string,
      contact_person: string,
      contact_number: string,
      email: string,
      contact_designation: string,
      created_by: string,
      id: any
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "iccp.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.ISSUER_CONTACT_UPDATE,
            {
              issuer_id:issuer_id ===undefined ? null : issuer_id,
              id:id ===undefined ? null : id,
              contact_person:contact_person ===undefined ? null : contact_person,
              contact_number:contact_number ===undefined ? null : contact_number,
              email:email ===undefined ? null : email,
              contact_designation:contact_designation ===undefined ? null : contact_designation,
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
        const task = "iccp.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.ISSUER_CONTACT_CREATE,
            {
              issuer_id,
              contact_person,
              contact_number,
              email,
              contact_designation,
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
      addEditIssuerConatct,
    };
  };
  return{
    useCreateIssuerContactService,
    useDeleteIssuerContactService,
    useGetIssuerContactByIdService,
    useGetIssuerContactListService,

  }
};export default useIssuerContactService;


