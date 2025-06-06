import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById } from "../services/clientService";

export default function ViewClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    getClientById(id).then((res) => {
      setClient(res.data);
    });
  }, [id]);

  if (!client)
    return <div className="container mt-5">Loading client details...</div>;

  const fields = [
    { label: "Client ID", value: client.clientId },
    { label: "Client Code", value: client.clientCode },
    { label: "Client Name", value: client.clientName },
    { label: "Address Line 1", value: client.addressLine1 },
    { label: "Address Line 2", value: client.addressLine2 },
    { label: "Address Line 3", value: client.addressLine3 },
    { label: "State", value: client.state },
    { label: "Country", value: client.country },
    { label: "Postal Code", value: client.postalCode },
    { label: "Status", value: client.status },
    { label: "Created By", value: client.createdBy },
    { label: "Modified By", value: client.modifiedBy },
    { label: "Created Date", value: client.createdDate },
    { label: "Modified Date", value: client.modifiedDate },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-primary">Client Details</h2>

        <div className="row g-3">
          {fields.map((field, index) => (
            <div className="col-md-6" key={index}>
              <div className="bg-light border rounded p-3 h-100">
                <h6 className="text-muted mb-1">{field.label}</h6>
                <p className="mb-0 fw-semibold text-dark">
                  {field.value && field.value.toString().trim() !== ""
                    ? field.value
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/clients")}
          >
            ← Back to Client List
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/clients/edit/${client.clientId}`)}
          >
            ✎ Edit
          </button>
        </div>
      </div>
    </div>
  );
}
