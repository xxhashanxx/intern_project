const BASE_URL = "https://m.resource.bitzify.com/api/v1/"; //"http://localhost:3200/api/v1/";
const AUTH_URL = "https://m.auth.bitzify.com/api/v1/";

export const API_MAIN_CONSTANT = {
  LOGIN: AUTH_URL + `auth/login`,

  USER_REGISTER: AUTH_URL + `auth/register`,
  USER_VALIDATE: AUTH_URL + `auth/validate`,
  UPDATE_PASSWORD: AUTH_URL + `auth/change-password`,

  USER_UPDATE: AUTH_URL + `users/update`,
  USER_DELETE: AUTH_URL + `users/delete`,
  USER_LIST: AUTH_URL + `users/list`,

  RM_LIST: BASE_URL + `rms/`,
  RM_CREATE: BASE_URL + `rms/create`,
  RM_UPDATE: BASE_URL + `rms/update`,
  RM_DELETE: BASE_URL + `rms`,

  TRUSTEE_LIST: BASE_URL + `trustees`,
  TRUSTEE_CREATE: BASE_URL + `trustees/create`,
  TRUSTEE_UPDATE: BASE_URL + `trustees/update`,
  TRUSTEE_DELETE: BASE_URL + `trustees`,

  TRUSTEE_CONTACT_LIST: BASE_URL + `tcps`,
  TRUSTEE_CONTACT_CREATE: BASE_URL + `tcps/create`,
  TRUSTEE_CONTACT_UPDATE: BASE_URL + `tcps/update`,
  TRUSTEE_CONTACT_DELETE: BASE_URL + `tcps`,

  COLLATERAL_LIST: BASE_URL + `collaterals`,
  COLLATERAL_CREATE: BASE_URL + `collaterals/create`,
  COLLATERAL_UPDATE: BASE_URL + `collaterals/update`,
  COLLATERAL_DELETE: BASE_URL + `collaterals`,

  LAWYER_LIST: BASE_URL + `lawyers`,
  LAWYER_CREATE: BASE_URL + `lawyers/create`,
  LAWYER_UPDATE: BASE_URL + `lawyers/update`,
  LAWYER_DELETE: BASE_URL + `lawyers`,

  CUSTOMER_LIST: BASE_URL + `customers`,
  CUSTOMER_CREATE: BASE_URL + `customers/create`,
  CUSTOMER_UPDATE: BASE_URL + `customers/update`,
  CUSTOMER_DELETE: BASE_URL + `customers`,
  CUSTOMER_NEXT_ID: BASE_URL + `customers/get-next-id/id`,
  CUSTOMER_APPROVE: BASE_URL + `customers/approve`,
  CUSTOMER_PREL: BASE_URL + `customers/get-prel-cust/all`,
  CUSTOMER_COUNT: BASE_URL + `customers/get-customer-counts/all`,

  CUSTOMER_CONTACT_LIST: BASE_URL + `ccps`,
  CUSTOMER_CONTACT_CREATE: BASE_URL + `ccps/create`,
  CUSTOMER_CONTACT_UPDATE: BASE_URL + `ccps/update`,
  CUSTOMER_CONTACT_DELETE: BASE_URL + `ccps`,

  DEFAULT_LIST: BASE_URL + `defaultvalues`,
  DEFAULT_CREATE: BASE_URL + `defaultvalues/create`,
  DEFAULT_UPDATE: BASE_URL + `defaultvalues/update`,
  DEFAULT_DELETE: BASE_URL + `defaultvalues`,

  ISSUER_LIST: BASE_URL + `issuers`,
  ISSUER_CREATE: BASE_URL + `issuers/create`,
  ISSUER_UPDATE: BASE_URL + `issuers/update`,
  ISSUER_DELETE: BASE_URL + `issuers`,
  ISSUER_NEXT_ID: BASE_URL + `issuers/get-next-id/id`,
  ISSUER_APPROVE: BASE_URL + `issuers/approve`,
  ISSUER_LIST_APPR: BASE_URL + `issuers/get-approved/all`,
  ISSUER_LIST_PREL: BASE_URL + `issuers/get-prel-issuer/all`,
  ISSUER_COUNT: BASE_URL + `issuers/get-issuer-counts/all`,

  ISSUER_CONTACT_LIST: BASE_URL + `icps`,
  ISSUER_CONTACT_CREATE: BASE_URL + `icps/create`,
  ISSUER_CONTACT_UPDATE: BASE_URL + `icps/update`,
  ISSUER_CONTACT_DELETE: BASE_URL + `icps`,

  ISSUE_LIST: BASE_URL + `issues`,
  ISSUE_CREATE: BASE_URL + `issues/create`,
  ISSUE_UPDATE: BASE_URL + `issues/update`,
  ISSUE_DELETE: BASE_URL + `issues`,
  ISSUE_NEXT_ID: BASE_URL + `issues/get-next-id/id`,
  ISSUE_DEF_VAL: BASE_URL + `issues/get-default-value/val`,
  ISSUE_RECENT: BASE_URL + `issues/get-recent-list/all`,
  ISSUE_COUNT: BASE_URL + `issues/get-issue-counts/all`,
  ISSUE_ONGOING: BASE_URL + `issues/get-ongoing-details/all`,

  ISSUE_INVESTMENT_UPLOAD: BASE_URL + `tmpinvestments/upload`,
  ISSUE_APPROVE: BASE_URL + `issues/approve`,
  ISSUE_CANCEL: BASE_URL + `issues/cancel`,
  ISSUE_REOPEN: BASE_URL + `issues/reopen`,

  ISSUE_CONTACT_LIST: BASE_URL + `icps`,
  ISSUE_CONTACT_CREATE: BASE_URL + `icps/create`,
  ISSUE_CONTACT_UPDATE: BASE_URL + `icps/update`,
  ISSUE_CONTACT_DELETE: BASE_URL + `icps`,

  DOCUMENTS_UPLOAD: BASE_URL + `documents/upload`,
  DOCUMENTS_DOWNLOAD: BASE_URL + `documents/download`,
  DOCUMENTS_LIST: BASE_URL + `documents`,
  DOCUMENTS_DELETE: BASE_URL + `documents`,

  ISSUE_TRUSTDEEDS_LIST: BASE_URL + `trustdeeds`,
  ISSUE_TRUSTDEEDS_CREATE: BASE_URL + `trustdeeds/create`,
  ISSUE_TRUSTDEEDS_UPDATE: BASE_URL + `trustdeeds/update`,
  ISSUE_TRUSTDEEDS_DELETE: BASE_URL + `trustdeeds`,

  QUOTATION_LIST: BASE_URL + `investments/get-filtered-list`,
  INVESTMENTS_DELETE: BASE_URL + `investments`,
  INVESTMENTS_APPROVE: BASE_URL + `investments/approve`,
  INVESTMENTS_CANCEL: BASE_URL + `investments/cancel`,
  INVESTMENTS_TRANSFER: BASE_URL + `investments/transfer`,

  MATURITY_INVESTMENTS: BASE_URL + `investments/maturity-list`,
  MATURITY_NOTIFY: BASE_URL + `investments/notify`,

  TMPINVESTMENTS_DELETE: BASE_URL + `tmpinvestments`,

  REPORT_CREATE: BASE_URL + `reports/create`,
  AUDIT_LOG_LIST: BASE_URL + `audit-logs/list`,
};
