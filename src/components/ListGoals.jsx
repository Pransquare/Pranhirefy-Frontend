


import React, { useState, useEffect } from 'react';
import { getAllGoals, softDeleteGoal } from '../servcice/serviceGoal';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import './ListGoals.css'; 

const ITEMS_PER_PAGE = 5;

const ListGoals = () => {
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getAllGoals();
        setGoals(response.data);
        setFilteredGoals(response.data);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };
    fetchGoals();
  }, []);

  // Soft delete a goal
  const handleDelete = async (id) => {
    try {
      await softDeleteGoal(id);
      const updated = await getAllGoals();
      setGoals(updated.data);
      setFilteredGoals(updated.data);
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = goals.filter(
      (goal) =>
        goal.goal.toLowerCase().includes(value.toLowerCase()) ||
        goal.goalCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGoals(filtered);
    setCurrentPage(1); // Reset pagination
  };

  const handleClearSearch = () => {
    setSearchText('');
    setFilteredGoals(goals);
    setCurrentPage(1);
  };

  const handleAddGoal = () => {
    navigate('/goal/add-goal');
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedGoals = filteredGoals.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredGoals.length / ITEMS_PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0 text-center mb-3">Goal Management</h4>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search Goal or Code"
              value={searchText}
              onChange={handleSearch}
            />
            <button className="btn btn-secondary me-2" onClick={handleClearSearch}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleAddGoal}>
              <i className="bi bi-plus-circle me-1"></i> Add Goal
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table  table-bordered">
              <thead >
                <tr>
                  <th>ID</th>
                  <th>Goal Code</th>
                  <th>Goal</th>
                  <th>Deleted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGoals.length > 0 ? (
                  paginatedGoals.map((goal) => (
                    <tr key={goal.goalId}>
                      <td>{goal.goalId}</td>
                      <td>{goal.goalCode}</td>
                      <td>{goal.goal}</td>
                      <td>{goal.deleted}</td> {/* Corrected */}
                      <td>
                        <div className="d-flex">
                          {/* <button
                            className="btn btn-info btn-sm me-2 icon-hover"
                            title="View"
                            onClick={() => navigate(`/goal/${goal.goalId}`)}
                          >
                            <MdVisibility />
                          </button>
                          <button
                            className="btn btn-warning btn-sm me-2 icon-hover"
                            title="Edit"
                            onClick={() => navigate(`/edit-goal/${goal.goalId}`)}
                          >
                            <MdEdit />
                          </button>
                          {goal.deleted !== 'Yes' && (
                            <button
                              className="btn btn-danger btn-sm icon-hover"
                              title="Delete"
                              onClick={() => handleDelete(goal.goalId)}
                            >
                              <MdDelete />
                            </button>
                          )} */}

{/* 
 <button
  className="btn  btn-sm me-2 icon-hover"
  title="View"
  onClick={() => navigate(`/goal/${goal.goalId}`)}
>
  <FaEye />
</button> */}

<div className='d-flex justify-content-between'>
  <div>
 <button
  className="btn  btn-sm me-2 icon-hover"
  title="View"
  onClick={() => navigate(`/goal/goal/${goal.goalId}`)}
>
  <FaEye />
</button>
</div>
  <div>
    
<button
  className="btn btn-sm me-2 icon-hover"
  title="Edit"
  onClick={() => navigate(`/goal/edit-goal/${goal.goalId}`)}
>
  <FaEdit />
</button>

  </div>
  <div>

    
{goal.deleted !== 'Yes' && (
  <button
    className="btn  btn-sm icon-hover"
    title="Delete"
    onClick={() => handleDelete(goal.goalId)}
  >
    <FaTrash />
  </button>
)}

  </div>
</div>
{/* 
<button
  className="btn btn-sm me-2 icon-hover"
  title="Edit"
  onClick={() => navigate(`/edit-goal/${goal.goalId}`)}
>
  <FaEdit />
</button> */}
{/* 
{goal.deleted !== 'Yes' && (
  <button
    className="btn  btn-sm icon-hover"
    title="Delete"
    onClick={() => handleDelete(goal.goalId)}
  >
    <FaTrash />
  </button>
)} */}



                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No goals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &laquo; Prev
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListGoals;



