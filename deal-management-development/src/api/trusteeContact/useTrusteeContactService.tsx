
import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useTrusteecontactService=() => {
  const useGetTrusteeContactListService = async (
    key: string,
    trusteeid: any
  ) => {
    if (trusteeid) {
      const task = "ccp.list";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.TRUSTEE_CONTACT_LIST + "/" + trusteeid,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useGetTrusteeContactByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "ccp.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.TRUSTEE_CONTACT_LIST + "/" + id,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDeleteTrusteeContactService = () => {
    const deleteTrusteeContact = async (
      trustee_id: string,
      delete_id: string
    ) => {
      const task = "ccp.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.TRUSTEE_CONTACT_DELETE +
            "/" +
            trustee_id +
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
      deleteTrusteeContact,
    };
  };
  const useCreateTrusteeContactService = () => {
    const addEditTrusteeConatct = async (
      isEditMode: boolean,
      trustee_id: string,
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
        const task = "ccp.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.TRUSTEE_CONTACT_UPDATE,
            {
              trustee_id:trustee_id ===undefined ? null : trustee_id,
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
        const task = "ccp.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.TRUSTEE_CONTACT_CREATE,
            {
              trustee_id,
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
      addEditTrusteeConatct,
    };
  };
  return{
    useCreateTrusteeContactService,
    useDeleteTrusteeContactService,
    useGetTrusteeContactByIdService,
    useGetTrusteeContactListService
  }
};export default useTrusteecontactService;
