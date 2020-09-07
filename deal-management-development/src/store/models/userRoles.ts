import { Action, action } from "easy-peasy";
import { cloneDeep } from "lodash";

export interface IUserRole {
  id: number;
  userRole: string;
}
export interface UserRolesModel {
  userRolesData: IUserRole[];
  addEditUserRoles: Action<UserRolesModel, IUserRole>;

  deleteUserRole: Action<UserRolesModel, number>;
}

const userRoles: UserRolesModel = {
  userRolesData: [
    {
      id: 1,
      userRole: "Admin",
    },
    {
      id: 2,
      userRole: "Editor",
    },
    {
      id: 3,
      userRole: "Manager",
    },
  ],
  addEditUserRoles: action((state, payload) => {
    const newState = cloneDeep(state);
    let index = payload.id;

    const isDataExist = newState.userRolesData.find((userRole) => {
      return userRole.id === index;
    });
    if (isDataExist) {
      const updatedObj = newState.userRolesData.map((userRole) => {
        if (userRole.id === index) {
          return payload;
        } else {
          return userRole;
        }
      });
      state.userRolesData = updatedObj;
    } else {
      state.userRolesData.push(payload);
    }
  }),

  deleteUserRole: action((state, payload) => {
    state.userRolesData = state.userRolesData.filter((userRoleItem) => {
      return userRoleItem.id !== payload;
    });
  }),
};

export default userRoles;
