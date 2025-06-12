import React, { useEffect, useState } from "react";
import {
  getClients,
  deleteClient,
  searchClients,
} from "../services/clientService";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./ClientList.css";
import NavbarSidebar from "./Sidebar";
import "../DesignationComponent.css";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Load all clients (non-deleted) from backend
  const loadClients = () => {
    setErrorMessage("");
    getClients()
      .then((res) => {
        setClients(res.data);
        setFilteredClients(res.data);
      })
      .catch((err) => {
        console.error("Error loading clients:", err);
        setErrorMessage("Failed to load clients.");
        setClients([]);
        setFilteredClients([]);
      });
  };

  // Load clients initially
  useEffect(() => {
    loadClients();
  }, []);

  // Search clients with debounce 500ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        loadClients();
      } else {
        setErrorMessage("");
        searchClients(searchTerm)
          .then((res) => {
            setFilteredClients(res.data);
            setCurrentPage(1);
          })
          .catch((err) => {
            console.error("Error searching clients:", err);
            const msg =
              err.response?.data?.message ||
              "Error searching clients. Please try again.";
            setErrorMessage(msg);
            setFilteredClients([]);
          });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Open modal to confirm delete
  const openDeleteModal = (id) => {
    setSelectedClientId(id);
    setShowDeleteModal(true);
  };

  // Confirm deletion of client
  const confirmDelete = () => {
    deleteClient(selectedClientId)
      .then((res) => {
        loadClients();
        setShowDeleteModal(false);

        const backendMsg = res.data?.message || "Client deleted successfully.";

        setSuccessMessage(backendMsg);
        setShowSuccessMessage(true);

        setTimeout(() => setShowSuccessMessage(false), 2000);
      })
      .catch((err) => {
        console.error("Error deleting client:", err);
        const error = err.response?.data?.message || "Failed to delete client.";
        setErrorMessage(error);
      });
  };

  // Clear search input and errors
  const handleClearSearch = () => {
    setSearchTerm("");
    setErrorMessage("");
  };

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Add padding for fixed footer pagination
  useEffect(() => {
    document.body.style.paddingBottom = "80px";
    return () => {
      document.body.style.paddingBottom = "0px";
    };
  }, []);

  return (
    <div className="container mt-5" style={{ paddingBottom: "80px" }}>
      <div className="NavbarSidebar">
        <NavbarSidebar />
      </div>

      <h2 className="text-primary">Clients</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Client Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="btn btn-secondary" onClick={handleClearSearch}>
          Clear
        </button>

        <button
          className="btn btn-primary ms-auto d-flex align-items-center gap-2"
          onClick={() => navigate("/clients/add")}
        >
          <FaPlus /> Add Client
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {errorMessage ? (
            <tr>
              <td
                colSpan="5"
                className="text-center text-danger fs-5 fw-semibold py-4"
              >
                {errorMessage}
              </td>
            </tr>
          ) : currentClients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No clients found.
              </td>
            </tr>
          ) : (
            currentClients.map((c) => (
              <tr key={c.clientId}>
                <td>{c.clientCode}</td>
                <td>{c.clientName}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    className="icon-button text-primary hover-view me-2"
                    onClick={() => navigate(`/clients/view/${c.clientId}`)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="icon-button text-warning hover-edit me-2"
                    onClick={() => navigate(`/clients/edit/${c.clientId}`)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="icon-button text-danger hover-delete"
                    onClick={() => openDeleteModal(c.clientId)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="fixed-bottom bg-white border-top py-2 shadow-sm">
          <nav className="d-flex justify-content-center">
            <ul className="pagination mb-5">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  &lt;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => goToPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 bg-danger text-white rounded shadow"
          style={{ zIndex: 1055 }}
        >
          {successMessage}
        </div>
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "red", color: "white" }}>
          Are you sure you want to delete{" "}
          <strong>
            {clients.find((c) => c.clientId === selectedClientId)?.clientName ||
              "this client"}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
