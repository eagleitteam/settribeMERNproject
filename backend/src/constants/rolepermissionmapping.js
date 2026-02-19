import ROLES from "./roles.js";
import PERMISSIONS from "./permissions.js";

const ROLE_PERMISSIONS = {
  [ROLES.Organiser]: [
    PERMISSIONS.READ,
    PERMISSIONS.CREATE,
    PERMISSIONS.UPDATE,
    PERMISSIONS.DELETE, // Full access
  ],

  [ROLES.HonCollector]: [
    PERMISSIONS.READ,
    PERMISSIONS.CREATE,
  ],

  [ROLES.HODs]: [
    PERMISSIONS.READ,
  ],
};

export default ROLE_PERMISSIONS;
