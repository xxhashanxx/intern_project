import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useTrustdeedsService = () => {
  const useGetTrustdeedsListService = async (key: string, issueId: string) => {
    if (issueId) {
      const task = "trustee.list";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUE_TRUSTDEEDS_LIST + "/" + issueId, axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useGetTrustdeedsByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "ccp.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUE_TRUSTDEEDS_LIST + "/" + id, axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDeleteTrustdeedsService = () => {
    const deleteTrustdeeds = async (issue_id: string, delete_id: string) => {
      const task = "ccp.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.ISSUE_TRUSTDEEDS_DELETE +
            "/" +
            issue_id +
            "/" +
            delete_id,
          axiosConfig
        )
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    };
    return {
      deleteTrustdeeds,
    };
  };
  const useCreateTrustdeedsService = () => {
    const addEditTrustdeeds = async (
      isEditMode: boolean,
      issue_id: string,
      deed_no: string,
      deed_date: any
    ) => {
      if (isEditMode) {
        const task = "ccp.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.ISSUE_TRUSTDEEDS_UPDATE,
            {
              issue_id:issue_id ===undefined ? null : issue_id,
              deed_no:deed_no ===undefined ? null : deed_no,
              deed_date:deed_date ===undefined ? null : deed_date,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        const task = "ccp.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.ISSUE_TRUSTDEEDS_CREATE,
            {
              issue_id,
              deed_no,
              deed_date,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error;
          });
      }
    };
    return {
      addEditTrustdeeds,
    };
  };
  return{
    useCreateTrustdeedsService,
    useDeleteTrustdeedsService,
    useGetTrustdeedsByIdService,
    useGetTrustdeedsListService
  }
};
export default useTrustdeedsService;
