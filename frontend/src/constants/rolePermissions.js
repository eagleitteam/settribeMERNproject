// src/constants/rolePermissions.js
export const ROLE_PERMISSIONS = {
  2: { // Organiser
    USERS: ["read", "create", "update", "delete"],
    REPORTS: ["read", "create"],
    MEETINGS: ["read", "create"],
    DASHBOARD: ["read"],
  },

  1: { // HonCollector
    REPORTS: ["read"],
    DASHBOARD: ["read"],
  },

  3: { // HODs
    MEETINGS: ["read"],
  },
};