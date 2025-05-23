import React, { useEffect, useState } from "react";
import { getAllReleaseNotes, deleteReleaseNote } from "././services/releaseNotesService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MasterReleaseNotesList = () => {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    loadReleaseNotes();
  }, []);

  const loadReleaseNotes = async () => {
    try {
      const res = await getAllReleaseNotes();
      setReleaseNotes(res.data);
      setFilteredNotes(res.data);
      setErrorMessage("");
    } catch (err) {
      console.error("Error fetching release notes:", err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteReleaseNote(deleteId);
      const updatedList = filteredNotes.filter((note) => note.id !== deleteId);
      setReleaseNotes(updatedList);
      setFilteredNotes(updatedList);
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting release note:", err);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredNotes(releaseNotes);
      setErrorMessage("");
      setCurrentPage(1);
      return;
    }
    const lowerValue = value.toLowerCase();
    const filtered = releaseNotes.filter((note) =>
      note.fileName?.toLowerCase().includes(lowerValue)
    );
    setFilteredNotes(filtered);
    setCurrentPage(1);
  };

  const handleCancelSearch = () => {
    setSearchTerm("");
    setFilteredNotes(releaseNotes);
    setErrorMessage("");
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Release Notes List</h2>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/add/releaseNote" className="btn btn-primary">
          <FaPlus className="me-2" /> Add Release Note
        </Link>
      </div>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter File Name to search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-secondary" onClick={handleCancelSearch}>
          Cancel
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-danger py-2">{errorMessage}</div>
      )}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>File Name</th>
            <th>Release Name</th>
            <th>Version</th>
            <th>Status</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((note) => (
              <tr key={note.id}>
                <td>{note.fileName}</td>
                <td>{note.releaseName}</td>
                <td>{note.releaseVersion}</td>
                <td>{note.status}</td>
                <td>{note.releaseDate}</td>
                <td>
                  <Link to={`/releaseNote/edit/${note.id}`} className="btn btn-outline-warning btn-sm mx-1">
                    <FaEdit />
                  </Link>
                  <Link to={`/releaseNote/view/${note.id}`} className="btn btn-outline-info btn-sm mx-1">
                    <FaEye />
                  </Link>
                  <button
                    onClick={() => confirmDelete(note.id)}
                    className="btn btn-outline-danger btn-sm mx-1"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-light me-2"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => goToPage(page + 1)}
              className={`btn me-1 ${
                currentPage === page + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-light ms-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this release note?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
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

export default MasterReleaseNotesList;
