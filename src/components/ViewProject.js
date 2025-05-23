import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectService from "../services/ProjectService";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProjectService.getProjectById(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-secondary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="alert alert-danger text-center mt-4">
        Project not found.
      </div>
    );
  }

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="text-primary fw-bold mb-4 text-center ">Project Details</h4>
        <div className="row">
          {[
            ["Project ID", project.project_master_id],
            ["Project Code", project.project_code],
            ["Project Name", project.project_name],
            ["Status", project.status],
            ["Created By", project.created_by],
            ["Created Date", formatDate(project.created_date)],
            ["Modified By", project.modified_by],
            ["Modified Date", formatDate(project.modified_date)],
            ["Location", project.location],
            ["Client Code", project.client_code],
            ["Start Date", formatDate(project.start_date)],
            ["End Date", formatDate(project.end_date)],
            ["Deleted", project.deleted],
          ].map(([label, value], i) => (
            <div className="col-md-6 mb-3 border rounded p-2" key={i}>
              <label className="fw-semibold">{label}</label>
              <div className="bg-light p-2 mt-1">{value || "N/A"}</div>
            </div>


          ))}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/projects")}>
            <FaArrowLeft className="me-2" />
            Back
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/projects/edit/${project.project_master_id}`)}
          >
            <FaEdit className="me-2" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
