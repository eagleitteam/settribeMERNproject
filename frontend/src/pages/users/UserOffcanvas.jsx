import React, { useEffect, useState } from "react";

const UserOffcanvas = ({ editUser, users, setUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    status: "Active",
  });

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData({
        name: "",
        email: "",
        contact: "",
        status: "Active",
      });
    }
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? formData : u)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }

    document.getElementById("offcanvasClose").click();
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="userOffcanvas"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
          {editUser ? "Edit User" : "Add User"}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          id="offcanvasClose"
        ></button>
      </div>

      <div className="offcanvas-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              className="form-control"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
            />
          </div>

          {editUser && (
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          )}

          <button className="btn btn-primary w-100">
            {editUser ? "Update User" : "Save User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOffcanvas;
