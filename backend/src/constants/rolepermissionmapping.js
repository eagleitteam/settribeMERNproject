import ROLES from "./roles.js";
import PERMISSIONS from "./permissions.js";

const ROLE_PERMISSIONS = {
  [ROLES.ORGANISER]: [
    PERMISSIONS.READ,
    PERMISSIONS.CREATE,
    PERMISSIONS.UPDATE,
    PERMISSIONS.DELETE, // Full access
  ],

  [ROLES.COLLECTOR]: [
    PERMISSIONS.READ,
    PERMISSIONS.CREATE,
  ],

  [ROLES.EMPLOYEE]: [
    PERMISSIONS.READ,
  ],
};

export default ROLE_PERMISSIONS;
