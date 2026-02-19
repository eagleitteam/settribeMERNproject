import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 🔹 Read user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔹 Role label
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

      <div>
        <h2>Meeting & Task Planner</h2>
      </div>

      {user && (
        <div
          className="profile-section"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="profile-img"
          />

          {/* ✅ Name + Role */}
          <div className="profile-info">
            <span className="profile-name">{user.name}</span>
            <span className="profile-role">{getRoleName(user.role)}</span>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu-custom">
              <p><strong>{user.email}</strong></p>
              <p>Role: {getRoleName(user.role)}</p>
              <hr />
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
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
