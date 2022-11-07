import { ERoleName } from "src/shared/type";

export const checkIsUserCredential = (data: { role: ERoleName }) => {
  return data.role === ERoleName.USERS;
};
export const checkIsAdminCredential = (data: { role: ERoleName }) => {
  return data.role === ERoleName.ADMINS;
};
