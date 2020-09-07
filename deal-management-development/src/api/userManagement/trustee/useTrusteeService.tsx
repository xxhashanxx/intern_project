import axios from "axios";
import { API_MAIN_CONSTANT } from "../../shared/config_path";
import GetAxiosConfig from "../../shared/axios_config";

const useTrusteeService = () => {
  const useDeleteTrusteeService = () => {
    const deleteTrustee = async (delete_id: string) => {
      const task = "trustee.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.TRUSTEE_DELETE + "/" + delete_id,axiosConfig)
  
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteTrustee
    };
  };
  const useGetTrusteeListService = async () => {
    const task = "trustee.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.TRUSTEE_LIST, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useCreateTrusteeService = () => {
    const addEditTrustee = async (
      isEditMode: boolean,
      trustee_id: string,
      trustee_name: string,
      email: string,
      contact_person: string,
      contact_person_desig: string,
      contact_number1: string,
      contact_number2: string,
      address_line1: string,
      address_line2: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "trustee.update";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.TRUSTEE_UPDATE,
            {
              trustee_id:trustee_id ===undefined ? null : trustee_id,
              trustee_name:trustee_name ===undefined ? null : trustee_name,
              email:email ===undefined ? null : email,
              contact_person:contact_person ===undefined ? null : contact_person,
              contact_person_desig:contact_person_desig ===undefined ? null : contact_person_desig,
              contact_number1:contact_number1 ===undefined ? null : contact_number1,
              contact_number2:contact_number2 ===undefined ? null : contact_number2,
              address_line1:address_line1 ===undefined ? null : address_line1,
              address_line2:address_line2 ===undefined ? null : address_line2,
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
        const task = "trustee.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.TRUSTEE_CREATE,
            {
              trustee_id,
              trustee_name,
              email,
              contact_person,
              contact_person_desig,
              contact_number1,
              contact_number2,
              address_line1,
              address_line2,
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
      addEditTrustee,
    };
  };

  const useGetTrusteeByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "customer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.TRUSTEE_LIST + "/" + id, axiosConfig)
        .then((response) => {
          return response.data;
        });

      return response;
    }
  };

  return {
    useCreateTrusteeService,
    useGetTrusteeListService,
    useDeleteTrusteeService,
    useGetTrusteeByIdService
  };

};export default useTrusteeService;


