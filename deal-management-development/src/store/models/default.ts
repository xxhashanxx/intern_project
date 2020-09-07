import { Action, action } from "easy-peasy";
import uuid from "uuid";

export interface DefaultValueModal {
  defaultKey: any;
  updatedefaultKey: Action<DefaultValueModal, string>;
  initdefaultKey: Action<DefaultValueModal>;
  cleardefaultKey: Action<DefaultValueModal>;
}

const DefaultValue: DefaultValueModal = {
  defaultKey: uuid.v4(),
  initdefaultKey: action((state) => {
    state.defaultKey = uuid.v4();
  }),
  updatedefaultKey: action((state, payload) => {
    state.defaultKey = payload;
  }),
  cleardefaultKey: action((state) => {
    state.defaultKey = null;
  }),
};

export default DefaultValue;
