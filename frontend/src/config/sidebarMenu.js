import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaCheckSquare,
} from "react-icons/fa";

export const SIDEBAR_MENU = [
  {
    label: "Dashboard",
    path: "/",
    icon: FaTachometerAlt,
    module: "DASHBOARD",
  },
  {
    label: "Meetings",
    path: "/meetings",
    icon: FaCalendarAlt,
    module: "MEETINGS",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: FaCheckSquare,
    module: "TASKS",
  },
  {
    label: "Add User",
    path: "/adduser",
    icon: FaCheckSquare,
    module: "USERS",
  },
];