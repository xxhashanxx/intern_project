import axios from "axios";
import { API_MAIN_CONSTANT } from "../shared/config_path";
import GetAxiosConfig from "../shared/axios_config";

const useIssueService = () => {
  const useGetIssueInvestmentUploadService = () => {
    const issueInvestmentUpload = async (uploadfile: any, issue_id: string) => {
      const task = "issue.list";
      const axiosConfig = GetAxiosConfig(task);
      const fileData = new FormData();
      fileData.append("file", uploadfile);
     // console.log(fileData);
  
      await axios
        .post(
          API_MAIN_CONSTANT.ISSUE_INVESTMENT_UPLOAD,
          { issue_id, uploadfile: fileData },
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
      issueInvestmentUpload,
    };
  };
  const useGetIssueListLobyService = async () => {
    const task = "issue.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUE_RECENT, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useGetOngoingIssueListService = async () => {
    const task = "issue.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUE_ONGOING, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useGetIssueListService = async () => {
    const task = "issue.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUE_LIST, axiosConfig)
      .then((response) => {
        return response.data.data;
      });
  
    return response;
  };
  const useGetIssueGetNextIdService = async () => {
    //if (id) {
      const task = "issuer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUE_NEXT_ID ,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
   // }
  };
  const useGetIssueDefValService = async () => {
    //if (id) {
      const task = "issuer.view";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUE_DEF_VAL ,axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
   // }
  };
  const useGetIssueCountService = async () => {
    const task = "issue.list";
    const axiosConfig = GetAxiosConfig(task);
    const response = await axios
      .get(API_MAIN_CONSTANT.ISSUE_COUNT, axiosConfig)
      .then((response) => {
        return response.data;
      });
  
    return response;
  };
  const useGetIssueByIdService = async (key: string, id: any) => {
    if (id) {
      const task = "rms.list";
      const axiosConfig = GetAxiosConfig(task);
      const response = await axios
        .get(API_MAIN_CONSTANT.ISSUE_LIST + "/" + id, axiosConfig)
        .then((response) => {
          return response.data;
        });
  
      return response;
    }
  };
  const useDeleteIssueService = () => {
    const deleteIssue = async (delete_id: string) => {
      const task = "issue.list";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(API_MAIN_CONSTANT.ISSUE_DELETE + "/" + delete_id, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      deleteIssue,
    };
  };
  const useDeleteInvestmentsService = () => {
    const deleteInvestments = async (issuerDataItem: any) => {
      const task = "issue.list";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .delete(
          API_MAIN_CONSTANT.INVESTMENTS_DELETE +
            "/" +
            issuerDataItem.issue_id +
            "/" +
            issuerDataItem.inv_id,
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
      deleteInvestments,

    };
  };
  const useCreateIssueService = () => {
    const addEditIssue = async (
      isEditMode: boolean,
      issue_id: string,
      issue_name: string,
      issuer_id: string,
      account_name: string,
      account_number: string,
      amount: string,
      attorney: Array<String>,
      auditor: string,
      bank: string,
      branch: string,
      cash_cover: string,
      collateral_id: string,
      lawyer_id: string,
      securitization_number: string,
      tenor: string,
      trustee_id: string,
      created_by: string
    ) => {
      const userDataObj = localStorage.getItem("userDataObj");
      let createdBy = "";
      if (userDataObj) {
        const convertedObj = JSON.parse(userDataObj);
        createdBy = convertedObj.userData.email;
      }
      if (isEditMode) {
        const task = "issue.list";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .put(
            API_MAIN_CONSTANT.ISSUE_UPDATE,
            {
              issue_id:issue_id ===undefined ? null : issue_id,
              issue_name:issue_name ===undefined ? null : issue_name,
              issuer_id:issuer_id ===undefined ? null : issuer_id,
              account_name:account_name ===undefined ? null : account_name,
              account_number:account_number ===undefined ? null : account_number,
              amount:amount ===undefined ? null : amount,
              attorney:attorney ===undefined ? null : attorney,
              auditor:auditor ===undefined ? null : auditor,
              bank:bank ===undefined ? null : bank,
              branch:branch ===undefined ? null : branch,
              cash_cover:cash_cover ===undefined ? null : cash_cover,
              collateral_id:collateral_id ===undefined ? null : collateral_id,
              lawyer_id:lawyer_id ===undefined ? null : lawyer_id,
              securitization_number:securitization_number ===undefined ? null : securitization_number,
              tenor:tenor ===undefined ? null : tenor,
              trustee_id:trustee_id ===undefined ? null : trustee_id,
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
        const task = "issue.create";
        const axiosConfig = GetAxiosConfig(task);
        await axios
          .post(
            API_MAIN_CONSTANT.ISSUE_CREATE,
            {
              issue_id,
              issue_name,
              issuer_id,
              account_name,
              account_number,
              amount,
              attorney,
              auditor,
              bank,
              branch,
              cash_cover,
              collateral_id,
              lawyer_id,
              securitization_number,
              tenor,
              trustee_id,
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
      addEditIssue,
    };
  };
  const useCancelIssueService = () => {
    const cancelIssue = async (issue_id: string) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(API_MAIN_CONSTANT.ISSUE_CANCEL + "/" + issue_id, {}, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      cancelIssue,
    };
  };
  const useReopenIssueService = () => {
    const reopenIssue = async (issue_id: string) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(API_MAIN_CONSTANT.ISSUE_REOPEN + "/" + issue_id, {}, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      reopenIssue,
    };
  };
  const useCancelInvestmentsService = () => {
    const cancelInvestments = async (invData: any) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(
          API_MAIN_CONSTANT.INVESTMENTS_CANCEL +
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
      cancelInvestments,
    };
  };
  const useApproveIssueService = () => {
    const approveIssue = async (aprrove_id: string) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(API_MAIN_CONSTANT.ISSUE_APPROVE + "/" + aprrove_id, {}, axiosConfig)
  
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    };
    return {
      approveIssue,
    };
  };
  const useApproveInvestmentsService = () => {
    const approveInvestments = async (invData: any) => {
      const task = "customer.approve";
      const axiosConfig = GetAxiosConfig(task);
      await axios
        .put(
          API_MAIN_CONSTANT.INVESTMENTS_APPROVE +
            "/" +
            invData.issue_id +
            "/" +
            invData.inv_id,
          {},
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
      approveInvestments,
    };
  };
  return{
    useApproveInvestmentsService,
    useApproveIssueService,
    useCancelInvestmentsService,
    useCancelIssueService,
    useCreateIssueService,
    useDeleteInvestmentsService,
    useDeleteIssueService,
    useGetIssueByIdService,
    useGetIssueCountService,
    useGetIssueDefValService,
    useGetIssueGetNextIdService,
    useGetIssueListService,
    useGetIssueListLobyService,
    useGetIssueInvestmentUploadService,
    useGetOngoingIssueListService,
    useReopenIssueService
  };
};export default useIssueService;


