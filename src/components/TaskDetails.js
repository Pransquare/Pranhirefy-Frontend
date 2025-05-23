import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiArrowLeft, FiEdit } from "react-icons/fi";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    taskService
      .getTaskById(id)
      .then((res) => setTask(res.data))
      .catch((err) => console.error("Error fetching task details", err));
  }, [id]);

  if (!task) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading task details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow border-0 rounded-4 bg-white">
        <div className="card-body p-4">
          <h3 className="text-center text-primary mb-4">Task Details</h3>

          {/* Highlighted Fields with label border color */}
          <div className="mb-4">
            {[
              { label: "Task ID", value: task.taskId },
              { label: "Task Code", value: task.taskCode },
              { label: "Task Description", value: task.taskDescription },
            ].map((field, index) => (
              <div
                className="mb-3 border rounded-3 p-3"
                key={index}
                style={{
                  borderColor: "#0d6efd", // Bootstrap primary blue
                  backgroundColor: "#f8f9fa",
                }}
              >
                <label className="form-label fw-semibold text-primary mb-1">
                  {field.label}
                </label>
                <div className="text-dark">{field.value}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary d-flex align-items-center gap-2"
              onClick={() => navigate("/tasks")}
            >
              <FiArrowLeft />
              Back to List
            </button>
            <button
              className="btn btn-warning d-flex align-items-center gap-2"
              onClick={() => navigate(`/tasks/edit-task/${task.taskId}`)}
            >
              <FiEdit />
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
