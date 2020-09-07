import issuer, { IssuerModal } from "./issuer";
import issue, { IssueModal } from "./issue";
import todos, { TodosModel } from "./todos";
import userRoles, { UserRolesModel } from "./userRoles";
import user, { UserModel } from "./user";
import customer, { CustomerModal } from "./customer";
import trustee, { TrusteeModal } from "./trustee";

export interface StoreModel {
  todos: TodosModel;
  user: UserModel;
  userRoles: UserRolesModel;
  customer: CustomerModal;
  issuer: IssuerModal;
  issue: IssueModal;
  trustee: TrusteeModal;
}

const model: StoreModel = {
  todos,
  user,
  userRoles,
  customer,
  issuer,
  issue,
  trustee
};

export default model;
