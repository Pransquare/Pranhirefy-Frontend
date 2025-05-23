import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../tasklist.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    taskService
      .getTaskById(id)
      .then((res) => setTask(res.data))
      .catch((err) => {
        console.error("Error fetching task", err);
        setErrorMessage("Could not load task details.");
      });
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    taskService
      .updateTask(task.taskId, task)
      .then(() => {
        setSuccessMessage("Task updated successfully!");
        setTimeout(() => navigate("/tasks"), 2000);
      })
      .catch((err) => {
        console.error("Error updating task", err);
        setErrorMessage("Failed to update task.");
      });
  };

  if (!task) return <div className="text-center mt-4">Loading task...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h4 className="text-primary mb-4 text-center">Edit Task</h4>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Read-only Task ID */}
          <div className="mb-3">
            <label className="form-label">Task ID</label>
            <input
              type="text"
              className="form-control thick-lebel"
              value={task.taskId}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Task Code</label>
            <input
              type="text"
              className="form-control thick-label"
              name="taskCode"
              value={task.taskCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label ">Task Description</label>
            <input
              type="text"
              className="form-control thick-label"
              name="taskDescription"
              value={task.taskDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-warning">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
