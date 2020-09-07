import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const investmentFilteredListService = () => {
  const useGetQuotationListService = async (key: string, id: any) => {
    if (id) {
      const task = "customer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.QUOTATION_LIST + "/" + id + "/Q", axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useGetConfirmedQuatationListService = async (key: string, id: any) => {
    if (id) {
      const task = "customer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.QUOTATION_LIST + "/" + id + "/C", axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  return{
    useGetConfirmedQuatationListService,
    useGetQuotationListService,
    
  }
};export default investmentFilteredListService; 

