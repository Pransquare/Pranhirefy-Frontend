import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToClients = () => {
    navigate('/clients');
  };

  const goToLeaveTypes = () => {
    navigate('/leavetypes');
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome to the Dashboard</h2>
      <div className="d-flex gap-3">
        <button className="btn btn-primary" onClick={goToClients}>
          Client Details
        </button>
        <button className="btn btn-primary" onClick={goToLeaveTypes}>
          Leave Type Details
        </button>
        <button className="btn btn-success" >
         Goal Details
        </button>
        <button className="btn btn-success" >
          ReleaseNotes Details
        </button>
        <button className="btn btn-success">
         Designation Details
        </button>
        <button className="btn btn-success" >
          Tasks Details
        </button>
        <button className="btn btn-success" >
        Project Details
        </button>
        
      </div>
    </div>
  );
};

export default HomePage;
