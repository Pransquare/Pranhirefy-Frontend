import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../services/clientService";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const navigate = useNavigate();

  const loadClients = () => {
    getClients().then((res) => {
      setClients(res.data);
      setFilteredClients(res.data);
    });
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) =>
      client.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this client?")) {
      deleteClient(id).then(() => loadClients());
    }
  };

  return (
    <div className="container mt-4">
      <h2>Clients</h2>

      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Client Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary ms-3"
          onClick={() => navigate("/add")}
        >
          Add Client
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
          {filteredClients.length > 0 ? (
            filteredClients.map((c) => (
              <tr key={c.clientId}>
                <td>{c.clientId}</td>
                <td>{c.clientCode}</td>
                <td>{c.clientName}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => navigate(`/view/${c.clientId}`)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(`/edit/${c.clientId}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(c.clientId)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
