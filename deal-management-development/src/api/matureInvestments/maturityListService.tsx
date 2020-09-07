import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const investmentService = () => {
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
  const useGetMaturityInvestment = async (key: string) => {
    
      const task = "customer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.MATURITY_INVESTMENTS, axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    
  };

  const useNotifiedtMaturityService = () => {
    const notifyInvestments = async (invData: any) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(
          API_MAIN_CONSTANT.MATURITY_NOTIFY +
            "/" +
            invData.issue_id +
            "/" +
            invData.inv_id,
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
      notifyInvestments,
    };
  };


  return{
    useGetMaturityInvestment,
    useGetQuotationListService,
    useNotifiedtMaturityService,
    
  }
};export default investmentService; 

