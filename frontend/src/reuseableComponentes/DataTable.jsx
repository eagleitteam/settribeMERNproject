import React, { useState } from "react";
import './dataTable.css'

const UsersTable = () => {
  // ===============================
  // State
  // ===============================
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Patil", email: "rahul@test.com", status: "Active" },
    { id: 2, name: "Amit Deshmukh", email: "amit@test.com", status: "Inactive" },
  ]);

  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEdit, setIsEdit] = useState(false);

  // ===============================
  // Modal Open
  // ===============================
  const openAddModal = () => {
    setIsEdit(false);
    setForm({ id: null, name: "", email: "" });

    const modal = new window.bootstrap.Modal(
      document.getElementById("userModal")
    );
    modal.show();
  };

  const openEditModal = (user) => {
    setIsEdit(true);
    setForm(user);

    const modal = new window.bootstrap.Modal(
      document.getElementById("userModal")
    );
    modal.show();
  };

  // ===============================
  // Save (Add / Edit)
  // ===============================
  const handleSave = () => {
    if (isEdit) {
      setUsers(users.map(u => (u.id === form.id ? form : u)));
    } else {
      setUsers([
        ...users,
        { ...form, id: Date.now(), status: "Active" },
      ]);
    }

    window.bootstrap.Modal.getInstance(
      document.getElementById("userModal")
    ).hide();
  };

  // ===============================
  // Delete
  // ===============================
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="container-fluid mt-4">

      {/* ================= Header ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold mb-0">User Management</h4>
        <button className="btn btn-primary" onClick={openAddModal}>
          <i className="bi bi-plus-circle me-1"></i> Add User
        </button>
      </div>

      {/* ================= Table ================= */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => openEditModal(u)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}
      <nav className="mt-3">
        <ul className="pagination justify-content-end mb-0">
          <li className="page-item disabled">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>

      {/* ================= Modal ================= */}
      <div className="modal fade" id="userModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit User" : "Add User"}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {isEdit ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      </div>

     
    </div>
  );
};

export default UsersTable;
