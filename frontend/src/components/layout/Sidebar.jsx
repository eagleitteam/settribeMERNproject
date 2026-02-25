import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

import { SIDEBAR_MENU } from "../../config/sidebarMenu.js";
import hasPermission from "../../utils/hasPermission.js";

const Sidebar = ({ isOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="logo">
        {isOpen ? "Menu Bar" : "M"}
      </div>

      <ul>
        {SIDEBAR_MENU.map((item) => {
          if (!hasPermission(role, item.module, "read")) return null;

          const Icon = item.icon;

          return (
            <li key={item.path}>
              <NavLink to={item.path} className="menu-link">
                <Icon className="icon" />
                <span className={`menu-text ${!isOpen ? "hide" : ""}`}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;