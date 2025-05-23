import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToClients = () => {
    navigate("/clients");
  };

  const goToLeaveTypes = () => {
    navigate("/leavetypes");
  };
  const goToReleaseNotes = () => {
    navigate("/relaseNote");
  };
  const goToTasks = () => {
    navigate("/tasks");
  };
  const goToProjects = () => {
    navigate("/projects");
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
        <button className="btn btn-success">Goal Details</button>
        <button className="btn btn-primary" onClick={goToReleaseNotes}>
          ReleaseNotes Details
        </button>
        <button className="btn btn-success">Designation Details</button>
        <button className="btn btn-primary" onClick={goToTasks}>
          Tasks Details
        </button>
        <button className="btn btn-primary" onClick={goToProjects}>
          Project Details
        </button>
      </div>
    </div>
  );
};

export default HomePage;
