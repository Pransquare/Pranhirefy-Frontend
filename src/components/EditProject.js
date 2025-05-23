import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/ProjectService";

const EditProjectForm = () => {
  const { id } = useParams();
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

  useEffect(() => {
    ProjectService.getProjectById(id)
      .then((res) => {
        const data = res.data || res;
        console.log("Fetched project:", data);
        // Normalize keys if needed
        setProject({
          project_code: data.project_code || "",
          project_name: data.project_name || "",
          client_code: data.client_code || "",
          status: data.status || "Active",
          location: data.location || "",
          created_by: data.created_by || data.createdBy || "",
          created_date: data.created_date || data.createdDate || "",
          modified_by: data.modified_by || data.modifiedBy || "",
          modified_date: data.modified_date || data.modifiedDate || "",
          start_date: data.start_date || data.startDate || "",
          end_date: data.end_date || data.endDate || "",
          deleted: data.deleted || "No",
        });
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setSuccessMessage("❌ Failed to load project details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await ProjectService.updateProject(id, project);
      setSuccessMessage("✅ Project updated successfully!");
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    } catch (err) {
      console.error("Error updating project:", err);
      setSuccessMessage("❌ Failed to update project.");
    }
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <div className="container mt-4 border p-4 rounded shadow-sm">
      <h2 className="text-center mb-4 text-primary">Edit Project Details</h2>

      {successMessage && (
        <div className="alert alert-info text-center mb-3">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <div className="row g-3">
          <div className="col-md-4">
            <label>Project Code</label>
            <input
              type="text"
              name="project_code"
              value={project.project_code}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Project Name</label>
            <input
              type="text"
              name="project_name"
              value={project.project_name}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Client Code</label>
            <input
              type="text"
              name="client_code"
              value={project.client_code}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Status</label>
            <select
              name="status"
              value={project.status}
              className="form-select"
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={project.location}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Created By</label>
            <input
              type="text"
              name="created_by"
              value={project.created_by || ""}
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-4">
            <label>Created Date</label>
            <input
              type="date"
              name="created_date"
              value={
                project.created_date
                  ? project.created_date.substring(0, 10)
                  : ""
              }
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-4">
            <label>Modified By</label>
            <input
              type="text"
              name="modified_by"
              value={project.modified_by}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Modified Date</label>
            <input
              type="date"
              name="modified_date"
              value={
                project.modified_date
                  ? project.modified_date.substring(0, 10)
                  : ""
              }
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={
                project.start_date ? project.start_date.substring(0, 10) : ""
              }
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={project.end_date ? project.end_date.substring(0, 10) : ""}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Deleted</label>
            <select
              name="deleted"
              value={project.deleted}
              className="form-select"
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
          <button type="submit" className="btn btn-primary">
            Edit Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
