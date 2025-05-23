import React, { useEffect, useState } from "react";
import taskService from "../services/taskService";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";
import "../tasklist.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    taskService
      .getAllTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks", err));
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    const modalElement = document.getElementById("deleteModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleDeleteConfirmed = () => {
    if (taskToDelete) {
      taskService.deleteTask(taskToDelete.taskId).then(() => {
        fetchTasks();
        setTaskToDelete(null);
        const modalInstance = Modal.getInstance(document.getElementById("deleteModal"));
        modalInstance.hide();
      });
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.taskDescription?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4" style={{ paddingBottom: "80px" }}>
      <div className="text-center mb-4">
        <h2 className="text-primary">Tasks</h2>
      </div>

      <div className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by Description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control"
          />
          <button
            className="btn btn-secondary"
            style={{ minWidth: "100px", height: "38px" }}
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
          <button
            className="btn btn-success d-flex align-items-center justify-content-center gap-2"
            style={{ minWidth: "120px", height: "38px", whiteSpace: "nowrap" }}
            onClick={() => navigate("/tasks/add-task")}
          >
            <FiPlus style={{ marginBottom: "2px" }} />
            Add Task
          </button>
        </div>
      </div>

      <div
        className="table-responsive"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
         
          
         
          
        }}
      >
        <table className="table table-bordered table-striped mb-0">
          <thead className="table-primary">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Code</th>
              <th className="text-center">Description</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task.taskId} style={{ height: "50px" }}>
                  <td className="text-center">{task.taskId}</td>
                  <td className="text-center">{task.taskCode}</td>
                  <td className="text-center">{task.taskDescription}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary me-2"
                      title="View"
                      onClick={() => navigate(`/tasks/view-task/${task.taskId}`)}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      title="Edit"
                      onClick={() => navigate(`/tasks/edit-task/${task.taskId}`)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      title="Delete"
                      onClick={() => confirmDelete(task)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Fixed Pagination */}
      {totalPages > 1 && (
        <div
          className="d-flex justify-content-center"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "white",
            
            height: "270px",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}

        >
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete Task Description{" "}
              <strong>{taskToDelete?.taskDescription}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
