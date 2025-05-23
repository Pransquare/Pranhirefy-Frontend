import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectService from "../services/ProjectService";

import '../Project.css';

const AddProjectForm = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    project_code: "",
    project_name: "",
    client_code: "",
    status: "Active",
    location: "",
    created_by: "",
    created_date: "",
    modified_by: "",
    modified_date: "",
    start_date: "",
    end_date: "",
    deleted: "No",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProjectService.createProject(project);
      setSuccessMessage("✅ Project added successfully!");
      setProject({
        project_code: "",
        project_name: "",
        client_code: "",
        status: "Active",
        location: "",
        created_by: "",
        created_date: "",
        modified_by: "",
        modified_date: "",
        start_date: "",
        end_date: "",
        deleted: "No",
      });
    } catch (err) {
      console.error("Error adding project:", err);
      setSuccessMessage("❌ Failed to add project.");
    }
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Add Project</h2>

      {successMessage && (
        <div className="alert alert-info text-center">{successMessage}</div>
      )}

      <div className="border rounded p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="">Project Code</label>
              <input
                type="text"
                name="project_code"
                value={project.project_code}
                className="form-control colored-label"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="">Project Name</label>
              <input
                type="text"
                name="project_name"
                value={project.project_name}
                className="form-control colored-label"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="">Client Code</label>
              <input
                type="text"
                name="client_code"
                value={project.client_code}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Status</label>
              <select
                name="status"
                value={project.status}
                className="form-select colored-label"
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="">Location</label>
              <input
                type="text"
                name="location"
                value={project.location}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Created By</label>
              <input
                type="text"
                name="created_by "
                value={project.created_by}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Created Date</label>
              <input
                type="date"
                name="created_date"
                value={project.created_date}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Modified By</label>
              <input
                type="text"
                name="modified_by"
                value={project.modified_by}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Modified Date</label>
              <input
                type="date"
                name="modified_date"
                value={project.modified_date}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={project.start_date}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">End Date</label>
              <input
                type="date"
                name="end_date"
                value={project.end_date}
                className="form-control colored-label"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="">Deleted</label>
              <select
                name="deleted"
                value={project.deleted}
                className="form-select colored-label"
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
