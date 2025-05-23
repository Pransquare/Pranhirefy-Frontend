import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../tasklist.css";


function AddTask() {
  const [taskCode, setTaskCode] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ New state for success message

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { taskCode, taskDescription };
    setErrorMessage("");
    setSuccessMessage("");

    taskService
      .addTask(newTask)
      .then(() => {
        setSuccessMessage("Task added successfully!"); // ✅ Set success message
        setTaskCode("");
        setTaskDescription("");

        // Navigate back to task list after a short delay (optional)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        if (error.response) {
          const message =
            error.response.data?.message ||
            error.response.data ||
            "Task code already exists. Please try another code.";
          setErrorMessage(message);
        } else {
          setErrorMessage("Server not reachable. Please try again.");
        }
      });
  };

  const handleClear = () => {
    setTaskCode("");
    setTaskDescription("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h4 className="text-primary mb-4 text-center">Add Task</h4>

        {/* ✅ Success message */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {/* ❌ Error message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Code</label>
            <input
              type="text"
              className="form-control thick-label"
              value={taskCode}
              onChange={(e) => setTaskCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Task Description</label>
            <input
              type="text"
              className="form-control thick-label"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <div>
              <button type="submit" className="btn btn-success me-2">
                Add Task
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;