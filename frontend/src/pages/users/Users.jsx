import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form, Modal, Badge } from "react-bootstrap";
import api from "../../services/api.js";
import hasPermission from "../../utils/hasPermission.js";
import MODULES from "../../constants/modules";
import PERMISSIONS from "../../constants/permissions";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    status: "Active"
  });

  /* ==========================
     LOAD USERS
  ========================== */
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ==========================
     SEARCH
  ========================== */
  const filteredUsers = users.filter(u =>
    Object.values(u).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  /* ==========================
     ADD
  ========================== */
  const handleAdd = () => {
    setEditUser(null);
    setFormData({ name: "", email: "", password: "", mobile: "", role: "", status: "Active" });
    setShowModal(true);
  };

  /* ==========================
     EDIT
  ========================== */
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  /* ==========================
     SAVE
  ========================== */
  const handleSave = async () => {
    try {
      if (editUser) {
        await api.put(`/users/${editUser._id}`, formData);
      } else {
        await api.post("/users", formData);
      }

      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  /* ==========================
     DELETE
  ========================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Container fluid className="p-4">

      <Row className="mb-3">
        <Col>
          <h4>User Management</h4>
        </Col>
        <Col className="text-end">
          {hasPermission(MODULES.USERS, PERMISSIONS.CREATE) && (
            <Button onClick={handleAdd}>+ Add User</Button>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, i) => (
            <tr key={u._id}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.role}</td>
              <td>
                <Badge bg={u.status === "Active" ? "success" : "secondary"}>
                  {u.status}
                </Badge>
              </td>
              <td>
                {hasPermission(MODULES.USERS, PERMISSIONS.UPDATE) && (
                  <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(u)}>
                    Edit
                  </Button>
                )}

                {hasPermission(MODULES.USERS, PERMISSIONS.DELETE) && (
                  <Button size="sm" variant="danger" onClick={() => handleDelete(u._id)}>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal same as before */}
    </Container>
  );
};

export default Users;