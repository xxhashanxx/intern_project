
import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";
import GetAxiosConfig1 from "../shared/axios_config_download";

var fileDownload = require('js-file-download');
const useDocumentService = () => {
  const useGetDocumentListById = async (key: string, extraPath: any) => {
    if (extraPath) {
      const task = "rms.list";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(
          API_MAIN_CONSTANT.DOCUMENTS_LIST + "/" + extraPath + "^",
          axiosConfig
        )
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDownloadDocumentService = () => {
    const downloadDocument = async (
      file_name: string,
      org_file_name: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
      }
      const task = "document.download";
      const axiosConfig1 = GetAxiosConfig1(task);
      await axios
        .get(
          API_MAIN_CONSTANT.DOCUMENTS_DOWNLOAD+ "/file/" + file_name,axiosConfig1
        )
  
        .then((response) => {
          fileDownload(response.data,org_file_name);
          //window.open(response.data,org_file_name);
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      downloadDocument,
    };
  };
  const useDeleteDocumentService = () => {
    const deleteDocument = async (url: string) => {
      const task = "issue.list";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.DOCUMENTS_DELETE + url, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteDocument,
    };
  };
  return{
    useDeleteDocumentService,
    useGetDocumentListById,
    useDownloadDocumentService,
  }
};
export default useDocumentService;
