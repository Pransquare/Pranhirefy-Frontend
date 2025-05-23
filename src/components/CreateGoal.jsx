import React, { useState } from "react";
import { createGoal } from "../services/serviceGoals";
import { useNavigate } from "react-router-dom";

const CreateGoal = () => {
  const [goalCode, setGoalCode] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const newGoal = {
      goalCode: goalCode.trim(),
      goal: goal.trim(),
    };

    if (!newGoal.goalCode || !newGoal.goal) {
      setError("Both Goal Code and Goal are required.");
      return;
    }

    try {
      await createGoal(newGoal);
      setSuccessMessage("Goal created successfully!");

      // Optionally clear fields
      setGoalCode("");
      setGoal("");

      // After 2 seconds, redirect to the list
      setTimeout(() => {
        navigate("/goal");
      }, 2000);
    } catch (error) {
      console.error("Failed to create goal:", error);
      setError(
        "Goal code already exists. Please try again with a new Goal code."
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="text-primary">Create New Goal</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Goal Code:</label>
              <input
                type="text"
                className="form-control"
                value={goalCode}
                onChange={(e) => setGoalCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Goal:</label>
              <input
                type="text"
                className="form-control"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success">
                Create Goal
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/goal")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;
