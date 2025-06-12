// import React, { useEffect, useState } from "react";
// import {
//   createClient,
//   getClientById,
//   updateClient,
// } from "../services/clientService";
// import { useNavigate, useParams } from "react-router-dom";

// export default function ClientForm() {
//   const [client, setClient] = useState({
//     clientCode: "",
//     clientName: "",
//     addressLine1: "",
//     addressLine2: "",
//     addressLine3: "",
//     state: "",
//     country: "",
//     postalCode: "",
//     status: "",
//     createdBy: "",
//     modifiedBy: "",
//     createdDate: "",
//     modifiedDate: "",
//   });

//   const [fieldErrors, setFieldErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = !!id;

//   const getCurrentDate = () => new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (isEdit) {
//       getClientById(id).then((res) => {
//         const data = res.data;
//         setClient({
//           clientCode: data.clientCode || "",
//           clientName: data.clientName || "",
//           addressLine1: data.addressLine1 || "",
//           addressLine2: data.addressLine2 || "",
//           addressLine3: data.addressLine3 || "",
//           state: data.state || "",
//           postalCode: data.postalCode || "",
//           country: data.country || "",
//           status: data.status || "",
//           createdBy: data.createdBy || "",
//           modifiedBy: loggedInUser?.username || loggedInUser?.email || "",
//           createdDate: data.createdDate || "",
//           modifiedDate: getCurrentDate(),
//         });
//       });
//     } else {
//       setClient((prev) => ({
//         ...prev,
//         createdDate: getCurrentDate(),
//         modifiedDate: "",
//         createdBy: loggedInUser?.username || loggedInUser?.email || "",
//       }));
//     }
//   }, [id, isEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setClient((prev) => ({ ...prev, [name]: value }));
//     setFieldErrors((prev) => ({ ...prev, [name]: null }));
//   };

//   const validateForm = () => {
//     const requiredFields = isEdit
//       ? [
//           "clientCode",
//           "clientName",
//           "addressLine1",
//           "state",
//           "postalCode",
//           "country",
//           "status",
//           "modifiedBy",
//         ]
//       : [
//           "clientCode",
//           "clientName",
//           "addressLine1",
//           "state",
//           "postalCode",
//           "country",
//           "status",
//           "createdBy",
//         ];

//     const errors = {};
//     requiredFields.forEach((field) => {
//       if (!client[field]) {
//         errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
//       }
//     });

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFieldErrors({});
//     setSuccessMessage("");

//     if (!validateForm()) return;

//     try {
//       let response;
//       if (isEdit) {
//         response = await updateClient(id, client);
//       } else {
//         response = await createClient(client);
//       }

//       const message = response?.data?.message || "Operation successful";
//       setSuccessMessage(message);

//       setTimeout(() => {
//         navigate("/clients");
//       }, 1500);
//     } catch (err) {
//       console.error("Submit error:", err);
//       const response = err.response;

//       if (response && (response.status === 400 || response.status === 409)) {
//         if (
//           response.status === 409 &&
//           response.data?.message?.includes("Client code already exists")
//         ) {
//           setFieldErrors({ clientCode: response.data.message });
//         } else if (response.data?.errors) {
//           setFieldErrors(response.data.errors);
//         } else if (response.data?.message) {
//           setFieldErrors({ general: response.data.message });
//         } else {
//           setFieldErrors({
//             general: `Error ${response.status}: ${response.statusText}`,
//           });
//         }
//       } else {
//         setFieldErrors({ general: "An unexpected error occurred." });
//       }
//     }
//   };

//   const inputStyle = { fontSize: "0.85rem", height: "36px" };
//   const requiredAsterisk = (
//     <span style={{ color: "red", marginLeft: "2px" }}>*</span>
//   );

//   const allFields = [
//     "clientCode",
//     "clientName",
//     "addressLine1",
//     "addressLine2",
//     "addressLine3",
//     "state",
//     "postalCode",
//     "country",
//     "status",
//   ];

//   const requiredFields = isEdit
//     ? [
//         "clientCode",
//         "clientName",
//         "addressLine1",
//         "state",
//         "postalCode",
//         "country",
//         "status",
//         "modifiedBy",
//       ]
//     : [
//         "clientCode",
//         "clientName",
//         "addressLine1",
//         "state",
//         "postalCode",
//         "country",
//         "status",
//         "createdBy",
//       ];

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4 position-relative">
//         {/* ✅ Success Message inside card, top-right */}
//         {successMessage && (
//           <div
//             className="alert alert-success d-flex align-items-center position-absolute top-0 end-0 m-3 p-2 py-1 shadow-sm"
//             role="alert"
//             style={{ zIndex: 1 }}
//           >
//             <span className="me-2 fw-bold text-success">✔</span>
//             <div className="text-success small">{successMessage}</div>
//           </div>
//         )}

//         <h4 className="mb-4 text-primary">
//           {isEdit ? "Edit Client" : "Add Client"}
//         </h4>
//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             {allFields.map((field) => (
//               <div className="col-md-6" key={field}>
//                 <label className="form-label text-muted small text-capitalize">
//                   {field}
//                   {requiredFields.includes(field) && requiredAsterisk}
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control py-1 ${
//                     fieldErrors[field] ? "is-invalid" : "border-primary"
//                   }`}
//                   style={inputStyle}
//                   name={field}
//                   value={client[field] ?? ""}
//                   onChange={handleChange}
//                 />
//                 {fieldErrors[field] && (
//                   <div className="invalid-feedback">{fieldErrors[field]}</div>
//                 )}
//               </div>
//             ))}

//             {!isEdit && (
//               <div className="col-md-6">
//                 <label className="form-label text-muted small">
//                   Created By{requiredAsterisk}
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control py-1 ${
//                     fieldErrors["createdBy"] ? "is-invalid" : "border-info"
//                   }`}
//                   style={inputStyle}
//                   name="createdBy"
//                   value={client.createdBy ?? ""}
//                   readOnly
//                 />
//                 {fieldErrors["createdBy"] && (
//                   <div className="invalid-feedback">
//                     {fieldErrors["createdBy"]}
//                   </div>
//                 )}
//               </div>
//             )}

//             {isEdit && (
//               <div className="col-md-6">
//                 <label className="form-label text-muted small">
//                   Modified By{requiredAsterisk}
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control py-1 ${
//                     fieldErrors["modifiedBy"] ? "is-invalid" : "border-info"
//                   }`}
//                   style={inputStyle}
//                   name="modifiedBy"
//                   value={client.modifiedBy ?? ""}
//                   readOnly
//                 />
//                 {fieldErrors["modifiedBy"] && (
//                   <div className="invalid-feedback">
//                     {fieldErrors["modifiedBy"]}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* General Error */}
//           {fieldErrors.general && (
//             <div className="alert alert-danger mt-3" role="alert">
//               {fieldErrors.general}
//             </div>
//           )}

//           <div className="d-flex justify-content-end mt-4">
//             <button
//               type="button"
//               className="btn btn-secondary px-4 me-2"
//               onClick={() => navigate("/clients")}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-success px-4" type="submit">
//               {isEdit ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
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
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (isEdit) {
      getClientById(id).then((res) => {
        const data = res.data;
        setClient({
          clientCode: data.clientCode || "",
          clientName: data.clientName || "",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          addressLine3: data.addressLine3 || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          country: data.country || "",
          status: data.status || "",
          createdBy: data.createdBy || "",
          modifiedBy: loggedInUser?.username || loggedInUser?.email || "",
          createdDate: data.createdDate || "",
          modifiedDate: getCurrentDate(),
        });
      });
    } else {
      setClient((prev) => ({
        ...prev,
        createdDate: getCurrentDate(),
        modifiedDate: "",
        createdBy: loggedInUser?.username || loggedInUser?.email || "",
      }));
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        navigate("/clients");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
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
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      let response;
      if (isEdit) {
        response = await updateClient(id, client);
      } else {
        response = await createClient(client);
      }

      const message = response?.data?.message || "Operation successful";
      setSuccessMessage(message);
    } catch (err) {
      console.error("Submit error:", err);
      const response = err.response;

      if (response && (response.status === 400 || response.status === 409)) {
        if (
          response.status === 409 &&
          response.data?.message?.includes("Client code already exists")
        ) {
          setFieldErrors({ clientCode: response.data.message });
        } else if (response.data?.errors) {
          setFieldErrors(response.data.errors);
        } else if (response.data?.message) {
          setFieldErrors({ general: response.data.message });
        } else {
          setFieldErrors({
            general: `Error ${response.status}: ${response.statusText}`,
          });
        }
      } else {
        setFieldErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  const inputStyle = { fontSize: "0.85rem", height: "36px" };
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
      {/* ✅ Success Toast */}
      {successMessage && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 bg-success text-white rounded shadow"
          style={{ zIndex: 1055 }}
        >
          {successMessage}
        </div>
      )}

      <div className="card shadow-lg p-4 position-relative">
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
                  className={`form-control py-1 ${
                    fieldErrors[field] ? "is-invalid" : "border-primary"
                  }`}
                  style={inputStyle}
                  name={field}
                  value={client[field] ?? ""}
                  onChange={handleChange}
                />
                {fieldErrors[field] && (
                  <div className="invalid-feedback">{fieldErrors[field]}</div>
                )}
              </div>
            ))}

            {!isEdit && (
              <div className="col-md-6">
                <label className="form-label text-muted small">
                  Created By{requiredAsterisk}
                </label>
                <input
                  type="text"
                  className={`form-control py-1 ${
                    fieldErrors["createdBy"] ? "is-invalid" : "border-info"
                  }`}
                  style={inputStyle}
                  name="createdBy"
                  value={client.createdBy ?? ""}
                  readOnly
                />
                {fieldErrors["createdBy"] && (
                  <div className="invalid-feedback">
                    {fieldErrors["createdBy"]}
                  </div>
                )}
              </div>
            )}

            {isEdit && (
              <div className="col-md-6">
                <label className="form-label text-muted small">
                  Modified By{requiredAsterisk}
                </label>
                <input
                  type="text"
                  className={`form-control py-1 ${
                    fieldErrors["modifiedBy"] ? "is-invalid" : "border-info"
                  }`}
                  style={inputStyle}
                  name="modifiedBy"
                  value={client.modifiedBy ?? ""}
                  readOnly
                />
                {fieldErrors["modifiedBy"] && (
                  <div className="invalid-feedback">
                    {fieldErrors["modifiedBy"]}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* General Error */}
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
