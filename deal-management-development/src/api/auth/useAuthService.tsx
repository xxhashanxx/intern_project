import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";

const userDataService = () => {
  const useValidateService = () => {
    const userValidate = async (userDataObj: any) => {
      const id_token = userDataObj.id_token;
      // const refresh_token = userDataObj.refresh_token;
      const id = userDataObj.id;
      return await axios
        .post(API_MAIN_CONSTANT.USER_VALIDATE, {
          id_token: id_token,
          refresh_token: "tocken",
          id: id,
        })

        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error.response.data.errorCode;
        });
    };
    return {
      userValidate,
    };
  };
  const useLoginService = () => {
    const login = async (email: string, password: string) => {
      return await axios
        .post(API_MAIN_CONSTANT.LOGIN, { email, password })

        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error.response.data.errorCode;
        });
    };
    return {
      login,
    };
  };
  return {
    useLoginService,
    useValidateService,
  };
};
export default userDataService;
