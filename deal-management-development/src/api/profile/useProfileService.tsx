import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useProfileService = () => {
  const updateProfile = async (new_password: string) => {
    const userDataObj = localStorage.getItem("userDataObj");
    let id_token = "";
    if (userDataObj) {
      const convertedObj = JSON.parse(userDataObj);
      id_token = convertedObj.userPermission.id_token;
    }
    const task = "profile.update";
    const axiosConfig = GetAxiosConfig(task);

    await axios
      .post(
        API_MAIN_CONSTANT.UPDATE_PASSWORD,
        {
          new_password,
          id_token,
        },
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
    updateProfile,
  };
};
export default useProfileService;
