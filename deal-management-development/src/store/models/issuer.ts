import { Action, action } from "easy-peasy";
import uuid from "uuid";

export interface IssuerModal {
  issuerId: any;
  updateIssuerId: Action<IssuerModal, string>;
  initIssuerId: Action<IssuerModal>;
  clearIssuerId: Action<IssuerModal>;
}

const Issuer: IssuerModal = {
  issuerId: uuid.v4(),
  initIssuerId: action((state) => {
    state.issuerId = uuid.v4();
  }),
  updateIssuerId: action((state, payload) => {
    state.issuerId = payload;
  }),
  clearIssuerId: action((state) => {
    state.issuerId = null;
  }),
};

export default Issuer;
