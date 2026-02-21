import ROLE_PERMISSIONS from "../constants/rolepermissionmapping.js";

const checkPermission = (moduleKey, requiredPermission) => {
  return (req, res, next) => {
    const role = req.user.role;

    const rolePermissions = ROLE_PERMISSIONS[role];
    if (!rolePermissions) {
      return res.status(403).json({ message: "Role not allowed" });
    }

    const modulePermissions = rolePermissions[moduleKey] || [];

    if (!modulePermissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

export default checkPermission;