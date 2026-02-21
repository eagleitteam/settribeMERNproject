import ROLES from "./roles.js";
import PERMISSIONS from "./permissions.js";
import MODULES from "../modules/role/modules.js"


const ROLE_PERMISSIONS = {
  [ROLES.Organiser]: {
    [MODULES.USERS]: [
      PERMISSIONS.READ,
      PERMISSIONS.CREATE,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE,
    ],
    [MODULES.REPORTS]: [
      PERMISSIONS.READ,
      PERMISSIONS.CREATE,
    ],
    [MODULES.MEETINGS]: [
      PERMISSIONS.READ,
      PERMISSIONS.CREATE,
    ],
  },

  [ROLES.HonCollector]: {
    [MODULES.REPORTS]: [
      PERMISSIONS.READ,
    ],
    [MODULES.DASHBOARD]: [
      PERMISSIONS.READ,
    ],
  },

  [ROLES.HODs]: {
    [MODULES.MEETINGS]: [
      PERMISSIONS.READ,
    ],
  },
};

export default ROLE_PERMISSIONS;