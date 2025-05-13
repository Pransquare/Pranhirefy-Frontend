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

  if (!client) return <div className="container mt-4">Loading...</div>;

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
    <div className="container mt-4">
      <h2>Client Details</h2>
      <div className="row">
        {fields.map((field, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="border p-3 rounded bg-light">
              <strong>{field.label}:</strong> <br />
              {field.value || "N/A"}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        ← Back to List
      </button>
    </div>
  );
}
