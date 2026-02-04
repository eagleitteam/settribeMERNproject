import ROLE_PERMISSIONS from "../constants/rolepermissionmapping.js";

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role; // JWT मधून येतो
    const permissions = ROLE_PERMISSIONS[userRole] || [];

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

export default checkPermission;
