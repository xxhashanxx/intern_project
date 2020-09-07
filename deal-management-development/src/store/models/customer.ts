import { Action, action } from "easy-peasy";

export interface CustomerModal {
  customerId: any;
  updateCustomerId: Action<CustomerModal, string>;
  clearCustomerId: Action<CustomerModal>;
}

const Customer: CustomerModal = {
  customerId: "",
  updateCustomerId: action((state, payload) => {
    state.customerId = payload;
  }),
  clearCustomerId: action((state) => {
    state.customerId = null;
  }),
};

export default Customer;
