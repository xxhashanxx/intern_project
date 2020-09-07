import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../../shared/config_path";
import GetAxiosConfig from "../../shared/axios_config";

const useRMService = ()=> {
  const useGetRMListService = async () => {
    const task = "rms.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.RM_LIST, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useDeleteRMService = () => {
    const deleteRM = async (delete_id: string) => {
      const task = "rms.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.RM_DELETE + "/" + delete_id, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteRM,
    };
  };
  const useCreateRMService = () => {
    const addEditRM = async (
      isEditMode: boolean,
      rm_id: string,
      manager_name: string,
      email: string,
      designation: string,
      contact_number: string,
      contact_number2: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "rms.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.RM_UPDATE,
            {
              rm_id:rm_id ===undefined ? null : rm_id,
              manager_name:manager_name ===undefined ? null : manager_name,
              email:email ===undefined ? null : email,
              designation:designation ===undefined ? null : designation,
              contact_number:contact_number ===undefined ? null : contact_number,
              contact_number2:contact_number2 ===undefined ? null : contact_number2,
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
        const task = "rms.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.RM_CREATE,
            {
              rm_id,
              manager_name,
              email,
              designation,
              contact_number,
              contact_number2,
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
      addEditRM,
    };
  };

  return{
    useCreateRMService,
    useDeleteRMService,
    useGetRMListService
  };
}
export default useRMService;
