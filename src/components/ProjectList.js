import React, { useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    ProjectService.getAllProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load projects");
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleView = (id) => navigate(`/projects/view/${id}`);
  const handleEdit = (id) => navigate(`/projects/edit/${id}`);
  const handleAdd = () => navigate("/projects/add");

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await ProjectService.deleteProject(projectToDelete.project_master_id);
      fetchProjects();
    } catch (err) {
      alert("Failed to delete the project.");
    } finally {
      setProjectToDelete(null);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-4 flex-grow-1">
        <h2 className="text-center mb-4 text-primary">Project Master List</h2>

        {/* Search and Add Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex w-75">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Project Name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-secondary ms-2" onClick={handleClear}>
              Clear
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <FaPlus /> Add Project
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-secondary">
              <tr className="text-center">
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No matching projects found.
                  </td>
                </tr>
              ) : (
                currentProjects.map((proj) => (
                  <tr className="text-center" key={proj.project_master_id}>
                    <td>{proj.project_master_id}</td>
                    <td>{proj.project_code}</td>
                    <td>{proj.project_name}</td>
                    <td>
                      <span
                        className={`badge ${
                          proj.status === "Active" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleView(proj.project_master_id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(proj.project_master_id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => setProjectToDelete(proj)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Pagination Footer with Increased Height */}
      {totalPages > 1 && (
        <div className="bg-light py-5 " style={{ minHeight: "250px" }}>
          <div className="container d-flex justify-content-center align-items-center h-100">
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li
                    key={idx + 1}
                    className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => goToPage(idx + 1)}>
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setProjectToDelete(null)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{projectToDelete.project_name}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setProjectToDelete(null)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
