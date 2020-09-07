import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useGetAuditLogService = async () => {
  const task = "rms.list";
  const axiosConfig = GetAxiosConfig(task);
  const response = await axios
    .post(API_MAIN_CONSTANT.AUDIT_LOG_LIST, {}, axiosConfig)
    .then((response) => {
      return response.data.data;
    });

  return response;
};
export default useGetAuditLogService;
