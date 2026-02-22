import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form, Modal, Badge } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:5000/api/meetings";

const Meetings = () => {

  /* ==========================
     STATE
  ========================== */
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    mode: "Online",
    location: "",
    department: "",
    agenda: "",
  });

  /* ==========================
     LOAD MEETINGS
  ========================== */
  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeetings(res.data);
    } catch (err) {
      console.error("Fetch meetings error", err.response || err.message);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  /* ==========================
     SEARCH
  ========================== */
  const filteredMeetings = meetings.filter(m =>
    Object.values(m).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  /* ==========================
     ADD MEETING
  ========================== */
  const handleAdd = () => {
    setEditMeeting(null);
    setFormData({
      title: "",
      date: "",
      time: "",
      duration: "",
      mode: "Online",
      location: "",
      department: "",
      agenda: "",
    });
    setShowModal(true);
  };

  /* ==========================
     EDIT MEETING
  ========================== */
  const handleEdit = (meeting) => {
    setEditMeeting(meeting);
    setFormData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      duration: meeting.duration,
      mode: meeting.mode,
      location: meeting.location,
      department: meeting.department,
      agenda: meeting.agenda,
    });
    setShowModal(true);
  };

  /* ==========================
     SAVE MEETING
  ========================== */
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editMeeting) {
        await axios.put(
          `${API_URL}/${editMeeting._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          API_URL,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setShowModal(false);
      fetchMeetings();
    } catch (err) {
      console.error("Save meeting error", err.response || err.message);
    }
  };

  /* ==========================
     DELETE MEETING
  ========================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meeting?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchMeetings();
    } catch (err) {
      console.error("Delete meeting error", err.response || err.message);
    }
  };

  /* ==========================
     UI
  ========================== */
  return (
    <Container fluid className="p-4">

      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h4 className="fw-bold">Meeting Management</h4>
        </Col>
        <Col className="text-end">
          <Button onClick={handleAdd}>+ Add Meeting</Button>
        </Col>
      </Row>

      {/* Search */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search meeting..."
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
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Mode</th>
            <th>Department</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredMeetings.length ? filteredMeetings.map((m, i) => (
            <tr key={m._id}>
              <td>{i + 1}</td>
              <td>{m.title}</td>
              <td>{m.date}</td>
              <td>{m.time}</td>
              <td>
                <Badge bg={m.mode === "Online" ? "info" : "secondary"}>
                  {m.mode}
                </Badge>
              </td>
              <td>{m.department}</td>
              <td className="text-center">
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(m)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(m._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No meetings found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMeeting ? "Edit Meeting" : "Add Meeting"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Meeting Title</Form.Label>
              <Form.Control
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Meeting Mode</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Online"
                  type="radio"
                  checked={formData.mode === "Online"}
                  onChange={() => setFormData({ ...formData, mode: "Online" })}
                />
                <Form.Check
                  inline
                  label="Offline"
                  type="radio"
                  checked={formData.mode === "Offline"}
                  onChange={() => setFormData({ ...formData, mode: "Offline" })}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {formData.mode === "Online" ? "Meeting Link" : "Meeting Location"}
              </Form.Label>
              <Form.Control
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Agenda</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.agenda}
                onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              />
            </Form.Group>

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

export default Meetings;