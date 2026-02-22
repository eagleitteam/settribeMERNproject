import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";

/*
  Future APIs:
  GET    /api/tasks
  PUT    /api/tasks/:id
  DELETE /api/tasks/:id
*/

const TasksManagement = () => {

  /* ==========================
     STATES
  ========================== */
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const [updateData, setUpdateData] = useState({
    status: "Pending",
    progressNotes: "",
  });

  /* ==========================
     MOCK FETCH (REPLACE WITH API)
  ========================== */
  useEffect(() => {
    setTasks([
      {
        _id: "1",
        meetingId: "M101",
        title: "Prepare MOM Document",
        assignedTo: "Amit Patil",
        department: "IT",
        deadline: "2026-02-25",
        status: "Pending",
        progressNotes: "",
        updatedAt: null,
      },
    ]);
  }, []);

  /* ==========================
     OPEN UPDATE MODAL
  ========================== */
  const handleEdit = (task) => {
    setActiveTask(task);
    setUpdateData({
      status: task.status,
      progressNotes: task.progressNotes || "",
    });
    setShowModal(true);
  };

  /* ==========================
     UPDATE TASK
  ========================== */
  const handleUpdate = () => {
    const updatedTasks = tasks.map((t) =>
      t._id === activeTask._id
        ? {
            ...t,
            status: updateData.status,
            progressNotes: updateData.progressNotes,
            updatedAt: new Date().toLocaleString(),
          }
        : t
    );

    setTasks(updatedTasks);
    setShowModal(false);
  };

  /* ==========================
     DELETE TASK
  ========================== */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks(tasks.filter((t) => t._id !== id));
  };

  /* ==========================
     STATUS BADGE
  ========================== */
  const statusVariant = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "warning";
    return "secondary";
  };

  /* ==========================
     UI
  ========================== */
  return (
    <Container fluid className="p-4">

      {/* Header */}
      <Row className="mb-3">
        <Col>
          <h4 className="fw-bold">Task Management</h4>
          <small className="text-muted">
            View and update tasks created during meetings
          </small>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Meeting ID</th>
            <th>Assigned To</th>
            <th>Department</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length ? (
            tasks.map((task, i) => (
              <tr key={task._id}>
                <td>{i + 1}</td>
                <td>{task.title}</td>
                <td>{task.meetingId}</td>
                <td>{task.assignedTo}</td>
                <td>{task.department}</td>
                <td>{task.deadline}</td>
                <td>
                  <Badge bg={statusVariant(task.status)}>
                    {task.status}
                  </Badge>
                </td>
                <td>{task.updatedAt || "-"}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ======================
         UPDATE MODAL
      ====================== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({ ...updateData, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Progress Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateData.progressNotes}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    progressNotes: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Updated On</Form.Label>
              <Form.Control
                disabled
                value={new Date().toLocaleString()}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Update
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default TasksManagement;