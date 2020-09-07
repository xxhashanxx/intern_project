import axios from "axios";
import { API_MAIN_CONSTANT } from "../../shared/config_path";
import GetAxiosConfig from "../../shared/axios_config";

const useAdminManagementService= () => {
  const useGetUserListService = async () => {
    const task = "users.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .post(API_MAIN_CONSTANT.USER_LIST, {}, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useDeleteUserService = () => {
    const deleteUser = async (delete_id: string) => {
      const task = "users.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.USER_DELETE + "/" + delete_id, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data.errorCode;
        });
    };
    return {
      deleteUser,
    };
  };
  const useCreateUserService = () => {
    const addEditUser = async (
      isEditMode: boolean,
      username: string,
      email: string,
      password: string,
      role: string
    ) => {
      if (isEditMode) {
        const task = "users.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.USER_UPDATE,
            {
              username: username,
              email,
              password,
              role,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error.response.data.errorCode;
          });
      } else {
        const task = "users.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.USER_REGISTER,
            {
              username: username,
              email,
              password,
              role,
            },
            axiosConfig
          )
  
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw error.response.data.errorCode;
          });
      }
    };
    return {
      addEditUser,
    };
  };
  return{
    useCreateUserService,
    useDeleteUserService,
    useGetUserListService, 
  };
};export default useAdminManagementService;


