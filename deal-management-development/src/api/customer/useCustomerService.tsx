import { useState } from "react";
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useCustomerService = () => {
  const useGetCustomerListLobyService = async () => {
    const task = "customer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.CUSTOMER_PREL, axiosConfig)
      .then((response) => {
        return response.data.data;
      });

    return response;
  };
  const useGetCustomerListService = async () => {
    const task = "customer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.CUSTOMER_LIST, axiosConfig)
      .then((response) => {
        return response.data.data;
      });

    return response;
  };
  const useGetCustomerGetNextIdService = async () => {
    //if (id) {
    const task = "issuer.view";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.CUSTOMER_NEXT_ID, axiosConfig)
      .then((response) => {
        return response.data;
      });

    return response;
    // }
  };
  const useGetCustomerCountService = async () => {
    const task = "customer.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.CUSTOMER_COUNT, axiosConfig)
      .then((response) => {
        return response.data;
      });

    return response;
  };
  const useGetCustomerByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "customer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.CUSTOMER_LIST + "/" + id, axiosConfig)
        .then((response) => {
          return response.data;
        });

      return response;
    }
  };
  const useDeleteCustomerService = () => {
    const deleteCustomer = async (delete_id: string) => {
      const task = "customer.delete";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.CUSTOMER_DELETE + "/" + delete_id,
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
      deleteCustomer,
    };
  };
  const useCreateCustomerService = () => {
    const addEditCustomer = async (
      isEditMode: boolean,
      customer_id: string,
      customer_name: string,
      email: string,
      customer_type: string,
      nic_passport_br: string,
      customer_rm: Array<String>,
      contact_number1: string,
      contact_number2: string,
      contact_number3: string,
      address1: string,
      address2: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      //  console.log(createdBy);
      if (isEditMode) {
        const task = "customer.update";
        const axiosConfig = GetAxiosConfig(task);

        await axios
          .put(
            API_MAIN_CONSTANT.CUSTOMER_UPDATE,
            {
              customer_id:customer_id ===undefined ? null : customer_id,
              customer_name:customer_name ===undefined ? null : customer_name,
              email:email ===undefined ? null : email,
              customer_type:customer_type ===undefined ? null : customer_type,
              nic_passport_br:nic_passport_br ===undefined ? null : nic_passport_br,
              customer_rm:customer_rm,
              contact_number1:contact_number1 ===undefined ? null : contact_number1,
              contact_number2:contact_number2 ===undefined ? null : contact_number2,
              contact_number3:contact_number3 ===undefined ? null : contact_number3,
              address1:address1 ===undefined ? null : address1,
              address2:address2 ===undefined ? null : address2,
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
        const task = "customer.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.CUSTOMER_CREATE,
            {
              customer_id,
              customer_name,
              email,
              customer_type,
              nic_passport_br,
              customer_rm,
              contact_number1,
              contact_number2,
              contact_number3,
              address1,
              address2,
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
      addEditCustomer,
    };
  };
  const useApproveCustomerService = () => {
    const approveCustomer = async (aprrove_id: string) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(
          API_MAIN_CONSTANT.CUSTOMER_APPROVE + "/" + aprrove_id,
          {},
          axiosConfig
        )

        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    };
    return {
      approveCustomer,
    };
  };
  return {
    useApproveCustomerService,
    useCreateCustomerService,
    useDeleteCustomerService,
    useGetCustomerByIdService,
    useGetCustomerCountService,
    useGetCustomerGetNextIdService,
    useGetCustomerListService,
    useGetCustomerListLobyService,
  };
};
export default useCustomerService;
