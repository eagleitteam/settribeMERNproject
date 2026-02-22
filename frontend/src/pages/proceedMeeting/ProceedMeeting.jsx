import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Badge
} from "react-bootstrap";
import axios from "axios";

const API_MEETING = "http://localhost:5000/api/meetings"; 
// future APIs:
// /attendance, /mom, /tasks

const ProceedMeeting = ({ meetingId }) => {

  /* ==========================
     STATES
  ========================== */
  const [meeting, setMeeting] = useState(null);
  const [attendees, setAttendees] = useState([]);

  const [attendance, setAttendance] = useState({});
  const [mom, setMom] = useState({
    title: "",
    description: "",
    department: "",
    linkedTask: "",
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    department: "",
    deadline: "",
    file: null,
  });

  /* ==========================
     FETCH MEETING
  ========================== */
  useEffect(() => {
    const fetchMeeting = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_MEETING}/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeeting(res.data);
      setAttendees(res.data.attendees || []);
    };

    fetchMeeting();
  }, [meetingId]);

  /* ==========================
     ATTENDANCE HANDLER
  ========================== */
  const handleAttendance = (id, field, value) => {
    setAttendance({
      ...attendance,
      [id]: {
        ...attendance[id],
        [field]: value,
        meetingId,
      },
    });
  };

  /* ==========================
     SAVE HANDLERS (API READY)
  ========================== */
  const saveAttendance = () => {
    console.log("Attendance Payload:", attendance);
  };

  const saveMoM = () => {
    console.log("MoM Payload:", { ...mom, meetingId });
  };

  const saveTask = () => {
    console.log("Task Payload:", { ...task, meetingId });
  };

  if (!meeting) return <p>Loading meeting...</p>;

  return (
    <Container fluid className="p-4">

      {/* ======================
         MEETING DETAILS
      ====================== */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={8}>
              <h5 className="fw-bold">{meeting.title}</h5>
              <p className="mb-1">
                📅 {meeting.date} | ⏰ {meeting.time}
              </p>
              <p className="mb-0">
                <Badge bg="info">{meeting.mode}</Badge>{" "}
                {meeting.mode === "Online" ? meeting.location : meeting.location}
              </p>
            </Col>
            <Col md={4} className="text-end">
              <Badge bg="secondary">{meeting.department}</Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ======================
         ATTENDANCE
      ====================== */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">Mark Attendance</Card.Header>
        <Card.Body>
          <Table bordered responsive>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th className="text-center">Present</th>
                <th className="text-center">Absent</th>
                <th>Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map(a => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td className="text-center">
                    <Form.Check
                      type="radio"
                      name={`att-${a._id}`}
                      onChange={() =>
                        handleAttendance(a._id, "status", "Present")
                      }
                    />
                  </td>
                  <td className="text-center">
                    <Form.Check
                      type="radio"
                      name={`att-${a._id}`}
                      onChange={() =>
                        handleAttendance(a._id, "status", "Absent")
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="time"
                      onChange={(e) =>
                        handleAttendance(a._id, "arrivalTime", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button onClick={saveAttendance}>Save Attendance</Button>
        </Card.Body>
      </Card>

      {/* ======================
         MOM FORM
      ====================== */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">Meeting Notes (MoM)</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                onChange={(e) => setMom({ ...mom, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setMom({ ...mom, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Select
                  onChange={(e) => setMom({ ...mom, department: e.target.value })}
                >
                  <option value="">Department</option>
                  <option>HR</option>
                  <option>IT</option>
                  <option>Finance</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select>
                  <option>Linked Task (optional)</option>
                </Form.Select>
              </Col>
            </Row>

            <Button className="mt-3" onClick={saveMoM}>
              Save MoM
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* ======================
         TASK ASSIGNMENT
      ====================== */}
      <Card>
        <Card.Header className="fw-bold">Assign Task</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Select
                  onChange={(e) =>
                    setTask({ ...task, assignedTo: e.target.value })
                  }
                >
                  <option>Assigned To</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) =>
                    setTask({ ...task, department: e.target.value })
                  }
                >
                  <option>Department</option>
                  <option>HR</option>
                  <option>IT</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setTask({ ...task, deadline: e.target.value })
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setTask({ ...task, file: e.target.files[0] })
                  }
                />
              </Col>
            </Row>

            <Button className="mt-3" onClick={saveTask}>
              Save Task
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default ProceedMeeting;