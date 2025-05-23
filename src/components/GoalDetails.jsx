import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getAllGoals, updateGoal } from "../servcice/serviceGoal";
import { getAllGoals, updateGoal } from "../services/serviceGoals";
import { MdArrowBack } from "react-icons/md"; // Arrow Back icon

const GoalDetails = () => {
  const { id } = useParams(); // goalId from URL
  const navigate = useNavigate();

  const [goal, setGoal] = useState(null);
  const [editable, setEditable] = useState(false);

  // Fetch single goal from list by ID
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getAllGoals(); // Get all, filter one
        const singleGoal = response.data.find((g) => g.goalId === parseInt(id));
        setGoal(singleGoal);
      } catch (error) {
        console.error("Failed to fetch goal:", error);
      }
    };

    fetchGoal();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateGoal(goal.goalId, goal);
      alert("Goal updated successfully.");
      setEditable(false);
      navigate("/goal");
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleBack = () => {
    navigate("/goal"); // Adjust path if necessary to navigate back to the goals list
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    // Reset the form fields to the original goal state
    setEditable(false);
    const fetchGoal = async () => {
      try {
        const response = await getAllGoals();
        const singleGoal = response.data.find((g) => g.goalId === parseInt(id));
        setGoal(singleGoal);
      } catch (error) {
        console.error("Failed to fetch goal:", error);
      }
    };
    fetchGoal();
  };

  if (!goal) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      {/* Show card for goal details */}
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">Goal Details</h4>
        </div>

        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="goalId" className="form-label">
                Goal ID
              </label>
              <input
                id="goalId"
                type="text"
                className="form-control"
                value={goal.goalId}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="goalCode" className="form-label">
                Goal Code
              </label>
              <input
                id="goalCode"
                type="text"
                className="form-control"
                name="goalCode"
                value={goal.goalCode}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="goal" className="form-label">
                Goal
              </label>
              <input
                id="goal"
                type="text"
                className="form-control"
                name="goal"
                value={goal.goal}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="isDeleted" className="form-label">
                Is Deleted
              </label>
              <input
                id="isDeleted"
                type="text"
                className="form-control"
                value={goal.isDeleted ? "Yes" : "No"}
                disabled
              />
            </div>
          </form>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={handleBack}>
            <MdArrowBack className="me-1" /> Go Back
          </button>

          {!editable ? (
            <button className="btn btn-warning" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <>
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
