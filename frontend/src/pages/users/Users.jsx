import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form, Modal, Badge } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

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
     LOAD USERS FROM DATABASE
  ========================== */
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API RESPONSE:", res.data); // ✅ NOW THIS WILL PRINT
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error", err.response || err.message);
    }
  };

  useEffect(() => {
    fetchUsers(); // ✅ VERY IMPORTANT
  }, []);


  /* ==========================
     SEARCH
  ========================== */
  const filteredUsers = Array.isArray(users)
  ? users.filter(u =>
      Object.values(u || {})
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  : [];

  /* ==========================
     ADD USER
  ========================== */
  const handleAdd = () => {
    setEditUser(null);
    setFormData({ name: "", email: "", mobile: "", role: "", password: "", status: "Active" });
    setShowModal(true);
  };

  /* ==========================
     EDIT USER
  ========================== */
  const handleEdit = (user) => {
  setEditUser(user);
  setFormData({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    status: user.status,
  });
  setShowModal(true);
};


  /* ==========================
     SAVE (ADD / UPDATE)
  ========================== */
  // const handleSave = async () => {
  //   try {
  //     if (editUser) {
  //       await axios.put(`${API_URL}/${editUser._id}`, formData);
  //     } else {
  //       await axios.post(`${API_URL}/register`, formData);
  //     }
  //     setShowModal(false);
  //     fetchUsers(); // reload table
  //   } catch (err) {
  //     console.error("Save error", err);
  //   }
  // };


  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    if (editUser) {
      await axios.put(
        `${API_URL}/${editUser._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } else {
      await axios.post(
        `${API_URL}/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    }

    setShowModal(false);
    fetchUsers();
  } catch (err) {
    console.error("Save error", err.response || err.message);
  }
};

  /* ==========================
     DELETE USER
  ========================== */
//   const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     fetchUsers();
//   } catch (err) {
//     console.error("Delete error", err.response || err.message);
//   }
// };

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchUsers();
  } catch (err) {
    console.error("Delete error", err.response || err.message);
  }
};

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h4 className="fw-bold">User Management</h4>
        </Col>
        <Col className="text-end">
          <Button onClick={handleAdd}>+ Add User</Button>
        </Col>
      </Row>

      {/* Search */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>mobile</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? filteredUsers.map((u, i) => (
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
              <td className="text-center">
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(u)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(u._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>mobile</Form.Label>
              <Form.Control
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value === "" ? "" : Number(e.target.value) })}
              >
                <option value="">-- Select Role --</option>
                <option value="1">Organiser</option>
                <option value="2">HODs</option>
              </Form.Select>
            </Form.Group>

            {editUser && (
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Select>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
