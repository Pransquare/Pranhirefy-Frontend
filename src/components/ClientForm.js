import React, { useEffect, useState } from "react";
import {
  createClient,
  getClientById,
  updateClient,
} from "../services/clientService";
import { useNavigate, useParams } from "react-router-dom";
import statePincodeData from "./statePincodeData.json"; // JSON with one PIN per state

export default function ClientForm() {
  const [client, setClient] = useState({
    clientCode: "",
    clientName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    state: "",
    country: "India", // Default to India
    postalCode: "",
    status: "",
    createdBy: "",
    modifiedBy: "",
    createdDate: "",
    modifiedDate: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isEdit) {
      getClientById(id).then((res) => {
        const data = res.data;
        setClient({
          ...data,
          modifiedDate: getCurrentDate(),
        });
      });
    } else {
      setClient((prev) => ({
        ...prev,
        createdDate: getCurrentDate(),
        modifiedDate: getCurrentDate(),
      }));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedClient = { ...client, [name]: value };

    if (name === "state") {
      const postal = statePincodeData[value] || "";
      updatedClient.postalCode = postal;
    }

    setClient(updatedClient);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate clientCode
    if (!client.clientCode.startsWith("PRAN")) {
      setError("Client Code must start with 'PRAN'");
      return;
    }

    // Check all required fields
    const requiredFields = [
      "clientCode",
      "clientName",
      "addressLine1",
      "addressLine2",
      "addressLine3",
      "state",
      "country",
      "postalCode",
      "status",
      "createdBy",
      "modifiedBy",
    ];

    for (let field of requiredFields) {
      if (!client[field]) {
        setError(`Please fill out the ${field} field.`);
        return;
      }
    }

    if (isEdit) {
      updateClient(id, client).then(() => navigate("/"));
    } else {
      createClient(client).then(() => navigate("/"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit Client" : "Add Client"}</h2>
      <form onSubmit={handleSubmit}>
        {[
          "clientCode",
          "clientName",
          "addressLine1",
          "addressLine2",
          "addressLine3",
          "state",
          "country",
          "status",
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              className={`form-control ${
                field === "clientCode" && error ? "is-invalid" : ""
              }`}
              name={field}
              value={client[field]}
              onChange={handleChange}
              required
            />
            {field === "clientCode" && error && (
              <div className="invalid-feedback">{error}</div>
            )}
          </div>
        ))}

        {/* Auto-filled postal code (read-only) */}
        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={client.postalCode}
            readOnly
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Created By</label>
          <input
            type="text"
            className="form-control"
            name="createdBy"
            value={client.createdBy}
            onChange={handleChange}
            required
            readOnly={isEdit}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Modified By</label>
          <input
            type="text"
            className="form-control"
            name="modifiedBy"
            value={client.modifiedBy}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <button className="btn btn-success" type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
