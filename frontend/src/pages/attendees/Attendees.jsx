import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Form, Modal } from "react-bootstrap";

const Attendees = () => {

  /* ==========================
     STATE
  ========================== */
  const [attendees, setAttendees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
  });

  /* ==========================
     ADD ATTENDEE
  ========================== */
  const handleAdd = () => {
    setEditIndex(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      department: "",
    });
    setShowModal(true);
  };

  /* ==========================
     EDIT ATTENDEE
  ========================== */
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(attendees[index]);
    setShowModal(true);
  };

  /* ==========================
     SAVE ATTENDEE
  ========================== */
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...attendees];
      updated[editIndex] = formData;
      setAttendees(updated);
    } else {
      setAttendees([...attendees, formData]);
    }

    setShowModal(false);
  };

  /* ==========================
     DELETE ATTENDEE
  ========================== */
  const handleDelete = (index) => {
    if (!window.confirm("Delete this attendee?")) return;
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  /* ==========================
     UI
  ========================== */
  return (
    <Container fluid className="p-3 border rounded bg-light">

      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h5 className="fw-bold mb-0">Attendees</h5>
        </Col>
        <Col className="text-end">
          <Button size="sm" onClick={handleAdd}>
            + Add Attendee
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive className="align-middle">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Mobile No</th>
            <th>Department</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {attendees.length ? attendees.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.mobile}</td>
              <td>{a.department}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No attendees added
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit Attendee" : "Add Attendee"}
          </Modal.Title>
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
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="">-- Select Department --</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
                <option>Marketing</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Attendees;