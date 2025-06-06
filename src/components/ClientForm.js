import React, { useEffect, useState } from "react";
import {
  createClient,
  getClientById,
  updateClient,
} from "../services/clientService";
import { useNavigate, useParams } from "react-router-dom";

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

  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (isEdit) {
      // Edit mode: fetch client and set modifiedBy from localStorage user
      getClientById(id).then((res) => {
        const data = res.data;
        setClient({
          ...data,
          modifiedDate: getCurrentDate(),
          modifiedBy: loggedInUser?.username || loggedInUser?.email || "",
        });
      });
    } else {
      // Add mode: set createdDate and createdBy from localStorage user
      setClient((prev) => ({
        ...prev,
        createdDate: getCurrentDate(),
        modifiedDate: "",
        createdBy: loggedInUser?.username || loggedInUser?.email || "",
      }));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const requiredFields = isEdit
      ? [
          "clientCode",
          "clientName",
          "addressLine1",
          "state",
          "postalCode",
          "country",
          "status",
          "modifiedBy",
        ]
      : [
          "clientCode",
          "clientName",
          "addressLine1",
          "state",
          "postalCode",
          "country",
          "status",
          "createdBy",
        ];

    const errors = {};
    requiredFields.forEach((field) => {
      if (!client[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!validateForm()) return;

    try {
      if (isEdit) {
        await updateClient(id, client);
      } else {
        await createClient(client);
      }
      navigate("/clients");
    } catch (err) {
      console.error("Submit error:", err);
      const response = err.response;

      if (response && response.status === 400 && response.data?.errors) {
        setFieldErrors(response.data.errors);
      } else if (response) {
        setFieldErrors({
          general: `Error ${response.status}: ${response.statusText}`,
        });
      } else {
        setFieldErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  const inputStyle = { fontSize: "0.85rem", height: "36px" };
  const errorStyle = { color: "red", fontSize: "0.75rem" };
  const requiredAsterisk = (
    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
  );

  const allFields = [
    "clientCode",
    "clientName",
    "addressLine1",
    "addressLine2",
    "addressLine3",
    "state",
    "postalCode",
    "country",
    "status",
  ];

  const requiredFields = isEdit
    ? [
        "clientCode",
        "clientName",
        "addressLine1",
        "state",
        "postalCode",
        "country",
        "status",
        "modifiedBy",
      ]
    : [
        "clientCode",
        "clientName",
        "addressLine1",
        "state",
        "postalCode",
        "country",
        "status",
        "createdBy",
      ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h4 className="mb-4 text-primary">
          {isEdit ? "Edit Client" : "Add Client"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {allFields.map((field) => (
              <div className="col-md-6" key={field}>
                <label className="form-label text-muted small text-capitalize">
                  {field}
                  {requiredFields.includes(field) && requiredAsterisk}
                </label>
                <input
                  type="text"
                  className="form-control border-primary py-1"
                  style={inputStyle}
                  name={field}
                  value={client[field]}
                  onChange={handleChange}
                />
                {fieldErrors[field] && (
                  <div style={errorStyle}>{fieldErrors[field]}</div>
                )}
              </div>
            ))}

            {/* Created By (only for add) */}
            {!isEdit && (
              <div className="col-md-6">
                <label className="form-label text-muted small">
                  Created By
                  {requiredAsterisk}
                </label>
                <input
                  type="text"
                  className="form-control border-info py-1"
                  style={inputStyle}
                  name="createdBy"
                  value={client.createdBy}
                  readOnly
                />
                {fieldErrors["createdBy"] && (
                  <div style={errorStyle}>{fieldErrors["createdBy"]}</div>
                )}
              </div>
            )}

            {/* Modified By (only for edit) */}
            {isEdit && (
              <div className="col-md-6">
                <label className="form-label text-muted small">
                  Modified By
                  {requiredAsterisk}
                </label>
                <input
                  type="text"
                  className="form-control border-info py-1"
                  style={inputStyle}
                  name="modifiedBy"
                  value={client.modifiedBy}
                  readOnly
                />
                {fieldErrors["modifiedBy"] && (
                  <div style={errorStyle}>{fieldErrors["modifiedBy"]}</div>
                )}
              </div>
            )}
          </div>

          {fieldErrors.general && (
            <div className="alert alert-danger mt-3" role="alert">
              {fieldErrors.general}
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
