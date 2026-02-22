import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";

/*
 Future APIs:
 GET    /api/mom?meetingId=
 POST   /api/mom
 PUT    /api/mom/:id
 DELETE /api/mom/:id
*/

const MomNotesManagement = () => {

  /* ==========================
     STATES
  ========================== */
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [notes, setNotes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    linkedTask: "",
  });

  /* ==========================
     MOCK DATA (Replace with API)
  ========================== */
  useEffect(() => {
    setMeetings([
      { _id: "M101", title: "Weekly IT Review" },
      { _id: "M102", title: "Finance Planning" },
    ]);

    setNotes([
      {
        _id: "N1",
        meetingId: "M101",
        title: "Server Upgrade Discussion",
        description: "Discussed migration timeline.",
        department: "IT",
        linkedTask: "Upgrade Infra",
        createdAt: "2026-02-23",
      },
    ]);
  }, []);

  /* ==========================
     FILTER NOTES
  ========================== */
  const filteredNotes = notes.filter(
    (n) => n.meetingId === selectedMeeting
  );

  /* ==========================
     ADD NEW NOTE
  ========================== */
  const handleAdd = () => {
    setEditNote(null);
    setFormData({
      title: "",
      description: "",
      department: "",
      linkedTask: "",
    });
    setShowModal(true);
  };

  /* ==========================
     EDIT NOTE
  ========================== */
  const handleEdit = (note) => {
    setEditNote(note);
    setFormData({
      title: note.title,
      description: note.description,
      department: note.department,
      linkedTask: note.linkedTask,
    });
    setShowModal(true);
  };

  /* ==========================
     SAVE NOTE
  ========================== */
  const handleSave = () => {
    if (!selectedMeeting) {
      alert("Please select a meeting first.");
      return;
    }

    if (editNote) {
      setNotes(
        notes.map((n) =>
          n._id === editNote._id
            ? { ...n, ...formData }
            : n
        )
      );
    } else {
      setNotes([
        ...notes,
        {
          _id: Date.now().toString(),
          meetingId: selectedMeeting,
          ...formData,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
    }

    setShowModal(false);
  };

  /* ==========================
     DELETE NOTE
  ========================== */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setNotes(notes.filter((n) => n._id !== id));
  };

  /* ==========================
     UI
  ========================== */
  return (
    <Container fluid className="p-4">

      {/* HEADER */}
      <Row className="mb-3">
        <Col>
          <h4 className="fw-bold">MoM Notes Management</h4>
          <small className="text-muted">
            Manage meeting-wise notes professionally
          </small>
        </Col>
      </Row>

      {/* MEETING SELECTOR */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={selectedMeeting}
            onChange={(e) => setSelectedMeeting(e.target.value)}
          >
            <option value="">-- Select Meeting --</option>
            {meetings.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col className="text-end">
          <Button onClick={handleAdd} disabled={!selectedMeeting}>
            + Add Note
          </Button>
        </Col>
      </Row>

      {/* NOTES TABLE */}
      <Table bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Note Title</th>
            <th>Department</th>
            <th>Linked Task</th>
            <th>Created On</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredNotes.length ? (
            filteredNotes.map((note, i) => (
              <tr key={note._id}>
                <td>{i + 1}</td>
                <td>{note.title}</td>
                <td>
                  <Badge bg="secondary">{note.department}</Badge>
                </td>
                <td>{note.linkedTask || "-"}</td>
                <td>{note.createdAt}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No notes found for this meeting
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editNote ? "Edit Note" : "Add Note"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Note Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="">Select Department</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Linked Task (optional)</Form.Label>
              <Form.Control
                value={formData.linkedTask}
                onChange={(e) =>
                  setFormData({ ...formData, linkedTask: e.target.value })
                }
              />
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

export default MomNotesManagement;