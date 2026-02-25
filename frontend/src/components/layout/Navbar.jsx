import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Read user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Role label
  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Organizer";
      case 3:
        return "Member";
      default:
        return "User";
    }
  };

  return (
    <nav className="navbar-custom">
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h2 className="navbar-title">Meeting & Task Planner</h2>

      {user && (
        <div className="profile-section">
          {/* Profile Image (CLICK ONLY HERE) */}
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="profile-img"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {/* Name + Role */}
          <div className="profile-info">
            <span className="profile-name">{user.name}</span>
            <span className="profile-role">{getRoleName(user.role)}</span>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="dropdown-menu-custom">
              <p className="email">{user.email}</p>
              <p className="role">Role: {getRoleName(user.role)}</p>
              <hr />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;