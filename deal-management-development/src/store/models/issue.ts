import { Action, action } from "easy-peasy";

export interface IssueModal {
  issueId: any;
  auditor: any;
  attorney: any;
  updateIssueId: Action<IssueModal, string>;
  updateAuditor: Action<IssueModal, string>;
  updateAttorney: Action<IssueModal, string>;
  initIssueId: Action<IssueModal>;
  clearIssueId: Action<IssueModal>;
}

const Issue: IssueModal = {
  issueId: null,
  auditor: null,
  attorney: null,
  initIssueId: action((state) => {
    state.issueId = null;
  }),

  updateIssueId: action((state, payload) => {
    state.issueId = payload;
  }),
  updateAuditor: action((state, payload) => {
    state.auditor = payload;
  }),
  updateAttorney: action((state, payload) => {
    state.attorney = payload;
  }),
  clearIssueId: action((state) => {
    state.issueId = null;
  }),
};

export default Issue;
