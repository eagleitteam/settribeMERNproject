// src/utils/hasPermission.js
// import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import ROLE_PERMISSIONS from "../constants/rolePermissions.js";

// export const hasPermission = (role, module, action) => {
//   if (!role && role !== 0) return false;

//   const rolePermissions = ROLE_PERMISSIONS[role];
//   if (!rolePermissions) return false;

//   const modulePermissions = rolePermissions[module];
//   if (!modulePermissions) return false;

//   return modulePermissions.includes(action);
// };

const hasPermission = (module, permission) => {
  const role = localStorage.getItem("role");
  if (!role) return false;

  const rolePermissions = ROLE_PERMISSIONS[role];
  if (!rolePermissions) return false;

  return rolePermissions[module]?.includes(permission);
};

export default hasPermission;