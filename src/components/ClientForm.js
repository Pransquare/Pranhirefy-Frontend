import React, { useEffect, useState } from "react";
import {
  createClient,
  getClientById,
  updateClient,
} from "../services/clientService";
import { useNavigate, useParams } from "react-router-dom";
import statePincodeData from "./statePincodeData.json";

export default function ClientForm() {
  const [client, setClient] = useState({
    clientCode: "",
    clientName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    state: "",
    country: "",
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
    setError(""); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      if (isEdit) {
        await updateClient(id, client);
      } else {
        await createClient(client);
      }
      navigate("/clients");
    } catch (err) {
      console.error("Error response:", err.response);

      if (err.response || err.response.status === 409) {
        // Set backend error message here
        const backendMessage =
          err.response.data.message || "Client code already exists.";
        setError(backendMessage);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        // Generic backend error message for other cases
        setError(err.response.data.message);
      } else {
        // Fallback error
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-primary">
          {isEdit ? "Edit Client" : "Add Client"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
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
              <div className="col-md-6" key={field}>
                <label className="form-label fw-semibold text-capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  className="form-control border-primary"
                  name={field}
                  value={client[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="col-md-6">
              <label className="form-label fw-semibold">Postal Code</label>
              <input
                type="text"
                className="form-control border-secondary bg-light"
                name="postalCode"
                value={client.postalCode}
                readOnly
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Created By</label>
              <input
                type="text"
                className="form-control border-info"
                name="createdBy"
                value={client.createdBy}
                onChange={handleChange}
                required
                readOnly={isEdit}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Modified By</label>
              <input
                type="text"
                className="form-control border-info"
                name="modifiedBy"
                value={client.modifiedBy}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-secondary px-4 me-2"
              onClick={() => navigate("/clients")}
            >
              Cancel
            </button>
            <button className="btn btn-success px-4" type="submit">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
