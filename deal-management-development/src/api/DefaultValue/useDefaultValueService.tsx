import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useDefaultValueService = () => {
  const useGetDefaultListService = async () => {
    const task = "issuer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.DEFAULT_LIST, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useDeleteDefaultValueService = () => {
    const deleteDefaultValue = async (delete_key: string) => {
  
      const task = "issuer.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.DEFAULT_DELETE + "/" + delete_key,axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    };
    return {
      deleteDefaultValue,
    };
  };
  const useCreateDefaultValueService = () => {
    const addEditDefaultValue = async (
      isEditMode: boolean,
      default_key: string,
      default_value: string,
      
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
            API_MAIN_CONSTANT.DEFAULT_UPDATE,
            {
              key:default_key ===undefined ? null : default_key,
              value:default_value ===undefined ? null : default_value,
              
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
            API_MAIN_CONSTANT.DEFAULT_CREATE,
            {
              key:default_key,
              value:default_value,
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
      addEditDefaultValue,
    
    };
  };
  return{
    useCreateDefaultValueService,
    useDeleteDefaultValueService,
    useGetDefaultListService,
  };
};export default useDefaultValueService;


