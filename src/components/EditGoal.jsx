
import React, { useState, useEffect } from 'react';
import { updateGoal, getAllGoals } from '../servcice/serviceGoal';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Optional icon for the back button

const EditGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goalId = parseInt(id);

  const [goalCode, setGoalCode] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await getAllGoals();
        const goalToEdit = response.data.find((g) => g.goalId === goalId);
        setGoalCode(goalToEdit.goalCode);
        setGoal(goalToEdit.goal);
      } catch (error) {
        console.error('Failed to fetch goal:', error);
      }
    };
    fetchGoal();
  }, [goalId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedGoal = { goalCode, goal };

    try {
      await updateGoal(goalId, updatedGoal);
      navigate('/goal'); // Redirect back to goal list after successful update
    } catch (error) {
      console.error('Failed to update goal:', error);
    }
  };

  const handleCancel = () => {
    navigate('/goal'); // Navigate back to the list page without saving
  };

  const handleGoBack = () => {
    navigate('/goal'); // Go back to the list of goals
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">Edit Goal Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="goalCode" className="form-label">Goal Code</label>
              <input
                id="goalCode"
                type="text"
                className="form-control"
                value={goalCode}
                onChange={(e) => setGoalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="goal" className="form-label">Goal</label>
              <input
                id="goal"
                type="text"
                className="form-control"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-primary me-2" type="submit" onClick={handleSubmit}>Save</button>
          <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-warning" onClick={handleGoBack}>
            <MdArrowBack className="me-1" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
