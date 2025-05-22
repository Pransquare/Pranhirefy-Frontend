// import React, { useEffect, useState } from "react";
// import { getClients, deleteClient } from "../services/clientService";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import "./ClientList.css"; // Make sure to import your custom CSS

// export default function ClientList() {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const clientsPerPage = 8;

//   const navigate = useNavigate();

//   const loadClients = () => {
//     getClients().then((res) => {
//       setClients(res.data);
//       setFilteredClients(res.data);
//     });
//   };

//   useEffect(() => {
//     loadClients();
//   }, []);

//   useEffect(() => {
//     const filtered = clients.filter((client) =>
//       client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredClients(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, clients]);

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this client?")) {
//       deleteClient(id).then(() => loadClients());
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchTerm("");
//   };

//   const indexOfLastClient = currentPage * clientsPerPage;
//   const indexOfFirstClient = indexOfLastClient - clientsPerPage;
//   const currentClients = filteredClients.slice(
//     indexOfFirstClient,
//     indexOfLastClient
//   );
//   const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   useEffect(() => {
//     document.body.style.paddingBottom = "80px";
//     return () => {
//       document.body.style.paddingBottom = "0px";
//     };
//   }, []);

//   return (
//     <div className="container mt-4" style={{ paddingBottom: "80px" }}>
//       <h2>Clients</h2>

//       <div className="mb-3 d-flex align-items-center gap-2">
//         <input
//           type="text"
//           className="form-control w-50"
//           placeholder="Search by Client Name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <button className="btn btn-secondary" onClick={handleClearSearch}>
//           Clear
//         </button>

//         <button
//           className="btn btn-primary ms-auto"
//           onClick={() => navigate("/add")}
//         >
//           <FaPlus /> Add Client
//         </button>
//       </div>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Code</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentClients.length > 0 ? (
//             currentClients.map((c) => (
//               <tr key={c.clientId}>
//                 <td>{c.clientId}</td>
//                 <td>{c.clientCode}</td>
//                 <td>{c.clientName}</td>
//                 <td>{c.status}</td>
//                 <td>
//                   <button
//                     className="icon-button text-primary hover-view me-2"
//                     onClick={() => navigate(`/view/${c.clientId}`)}
//                     title="View"
//                   >
//                     <FaEye />
//                   </button>
//                   <button
//                     className="icon-button text-warning hover-edit me-2"
//                     onClick={() => navigate(`/edit/${c.clientId}`)}
//                     title="Edit"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="icon-button text-danger hover-delete"
//                     onClick={() => handleDelete(c.clientId)}
//                     title="Delete"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No clients found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//         <div className="fixed-bottom bg-white border-top py-2 shadow-sm">
//           <nav className="d-flex justify-content-center">
//             <ul className="pagination mb-0">
//               <li
//                 className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => goToPage(currentPage - 1)}
//                 >
//                   &lt;
//                 </button>
//               </li>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <li
//                   key={i + 1}
//                   className={`page-item ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   <button className="page-link" onClick={() => goToPage(i + 1)}>
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}
//               <li
//                 className={`page-item ${
//                   currentPage === totalPages ? "disabled" : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => goToPage(currentPage + 1)}
//                 >
//                   &gt;
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../services/clientService"; // updated import path
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./ClientList.css";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const navigate = useNavigate();

  const loadClients = () => {
    getClients()
      .then((res) => {
        console.log("Loaded clients:", res.data);
        setClients(res.data);
        setFilteredClients(res.data);
      })
      .catch((err) => {
        console.error("Error loading clients:", err);
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
    setCurrentPage(1);
  }, [searchTerm, clients]);

  const openDeleteModal = (id) => {
    setSelectedClientId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteClient(selectedClientId)
      .then(() => {
        loadClients();
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error("Error deleting client:", err);
      });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

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

  useEffect(() => {
    document.body.style.paddingBottom = "80px";
    return () => {
      document.body.style.paddingBottom = "0px";
    };
  }, []);

  return (
    <div className="container mt-4" style={{ paddingBottom: "80px" }}>
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
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.length > 0 ? (
            currentClients.map((c) => (
              <tr key={c.clientId}>
                <td>{c.clientId}</td>
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
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No clients found.
              </td>
            </tr>
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
