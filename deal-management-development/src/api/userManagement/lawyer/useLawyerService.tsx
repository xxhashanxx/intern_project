import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../../shared/config_path";
import GetAxiosConfig from "../../shared/axios_config";

const useLawyerService = () => {
  const useGetLawyerListService = async () => {
    const task = "lawyer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.LAWYER_LIST, axiosConfig)
      .then((response) => {
        return response.data;
      });
    return response;
  };
  const useDeleteLawyerService = () => {
    const deleteLawyer = async (delete_id: string) => {
      const task = "lawyer.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.LAWYER_DELETE + "/" + delete_id,axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteLawyer,
    };
  };
  const useCreateLawyerService = () =>{
    const addEditLawyer = async (
      isEditMode: boolean,
      lawyer_id: string,
      lawyer_name: string,
      email: string,
      contact_number1: string,
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
        const task = "lawyer.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.LAWYER_UPDATE,
            {
              lawyer_id:lawyer_id ===undefined ? null : lawyer_id,
              lawyer_name:lawyer_name ===undefined ? null : lawyer_name,
              email:email ===undefined ? null : email,
              contact_number1:contact_number1 ===undefined ? null : contact_number1,
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
        const task = "lawyer.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.LAWYER_CREATE,
            {
              lawyer_id,
              lawyer_name,
              email,
              contact_number1,
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
      addEditLawyer,
      
    };
  };


  return{
    useCreateLawyerService,
    useDeleteLawyerService,
    useGetLawyerListService
  }; 
};
export default useLawyerService;
