import { Action, action } from "easy-peasy";

export interface UserModel {
  userData: any;
  updateUserData: Action<UserModel, string>;
  clearUserData: Action<UserModel>;
}

const user: UserModel = {
  userData: null,
  updateUserData: action((state, payload) => {
    state.userData = payload;
  }),
  clearUserData: action((state) => {
    state.userData = null;
  }),
};

export default user;
