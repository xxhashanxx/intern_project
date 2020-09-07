import { Action, action } from "easy-peasy";

export interface TrusteeModal {
  trusteeId: any;
  updateTrusteeId: Action<TrusteeModal, string>;
  clearTrusteeId: Action<TrusteeModal>;
}

const Trustee: TrusteeModal = {
  trusteeId: "",
  updateTrusteeId: action((state, payload) => {
    state.trusteeId = payload;
  }),
  clearTrusteeId: action((state) => {
    state.trusteeId = null;
  }),
};

export default Trustee;
