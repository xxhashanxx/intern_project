import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../../shared/config_path";
import GetAxiosConfig from "../../shared/axios_config";

const useCollateralService = () => {
  const useGetCollateralListService = async () => {
    const task = "collateral.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.COLLATERAL_LIST, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useDeleteCollateralService = () => {
    const deleteCollateral = async (delete_id: string) => {
      const task = "collateral.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.COLLATERAL_DELETE + "/" + delete_id,axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteCollateral,
    };
  };
  const useCreateCollateralService = () => {
    const addEditCollateral = async (
      isEditMode: boolean,
      collateral_id: string,
      collateral_name: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "collateral.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.COLLATERAL_UPDATE,
            {
              collateral_id:collateral_id ===undefined ? null : collateral_id,
              collateral_name:collateral_name ===undefined ? null : collateral_name,
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
        const task = "collateral.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.COLLATERAL_CREATE,
            {
              collateral_id,
              collateral_name,
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
      addEditCollateral,
    };
  };

  return{
    useCreateCollateralService,
    useDeleteCollateralService,
    useGetCollateralListService
  }

};


export default useCollateralService;
