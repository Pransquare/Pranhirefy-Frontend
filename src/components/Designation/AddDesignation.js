//   // AddDesignationComponent.jsx
//   import React, { useState } from 'react';
//   import axios from 'axios';
//   import { useNavigate } from 'react-router-dom';
// import HeaderComponent from './HeaderComponent';
 
//   export default function AddDesignationComponent() {
//   const [formData, setFormData] = useState({
//     masterDesignationCode: '',
//     designationDescription: '',
//     createdBy: '',
//     createdDate: new Date().toISOString(), // e.g. 2025-05-15T13:30:00.000Z
//   });
 
 
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
 
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
 
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await axios.post('http://localhost:8080/api/designation', formData);
//         setMessage('Designation added successfully.');
//         setTimeout(() => navigate('/'), 2000); // Redirect back after success
//       } catch (error) {
//         console.error('Error adding designation:', error);
//         setMessage('Failed to add designation.');
//       }
//     };
 
//     return (
//       <div className="container mt-4">
//         <HeaderComponent/>
//         <h2 className="text-primary mb-4 main-content">Add New Designation</h2>
 
//         {message && <div className="alert alert-info">{message}</div>}
 
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Designation Code</label>
//             <input
//               type="text"
//               className="form-control"
//               name="masterDesignationCode"
//               value={formData.masterDesignationCode}
//               onChange={handleChange}
//               required
//             />
//           </div>
 
//           <div className="mb-3">
//             <label className="form-label">Designation Description</label>
//             <input
//               type="text"
//               className="form-control"
//               name="designationDescription"
//               value={formData.designationDescription}
//               onChange={handleChange}
//               required
//             />
//           </div>
 
//           <div className="mb-3">
//             <label className="form-label">Created By</label>
//             <input
//               type="text"
//               className="form-control"
//               name="createdBy"
//               value={formData.createdBy}
//               onChange={handleChange}
//               required
//             />
//           </div>
 
//           <div className="mb-3">
//             <label className="form-label">Created Date</label>
//             <input
//               type="text"
//               className="form-control"
//               value={formData.createdDate}
//               readOnly
//             />
//           </div>
 
//           <button type="submit" className="btn btn-success">Save Designation</button>
//         </form>
//       </div>
//     );
//   }
 
  
  // import React, { useState } from 'react';
  // import axios from 'axios';
  // import { useNavigate } from 'react-router-dom';
  // import HeaderComponent from '../HeaderComponent';
  
  // export default function AddDesignationComponent() {
  //   const [formData, setFormData] = useState({
  //     masterDesignationCode: '',
  //     designationDescription: '',
  //     createdBy: '',
  //     createdDate: new Date().toISOString(), // e.g. 2025-05-15T13:30:00.000Z
  //   });
  
  //   const [message, setMessage] = useState('');
  //   const navigate = useNavigate();
  
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await axios.post('http://localhost:8080/api/designation', formData);
  //       setMessage('Designation added successfully.');
  //       setTimeout(() => navigate('/designation'), 2000); // Redirect back after success
  //     } catch (error) {
  //       console.error('Error adding designation:', error);
  //       setMessage('Failed to add designation.');
  //     }
  //   };
  
  //   return (
  //     <div className="container mt-4">
  //       <HeaderComponent />
  //       <h2 className="text-primary mb-4 main-content">Add New Designation</h2>
  
  //       {message && <div className="alert alert-info">{message}</div>}
  
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label className="form-label">Designation Code</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="masterDesignationCode"
  //             value={formData.masterDesignationCode}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  
  //         <div className="mb-3">
  //           <label className="form-label">Designation Description</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="designationDescription"
  //             value={formData.designationDescription}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  
  //         <div className="mb-3">
  //           <label className="form-label">Created By</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="createdBy"
  //             value={formData.createdBy}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  
  //         <div className="mb-3">
  //           <label className="form-label">Created Date</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             value={formData.createdDate}
  //             readOnly
  //           />
  //         </div>
  
  //         {/* Buttons container */}
  //         <div className="d-flex justify-content-between mt-4">
  //           <button
  //             type="button"
  //             className="btn btn-secondary"
  //             onClick={() => navigate('/designation')}
  //           >
  //             Back to List
  //           </button>
  
  //           <button type="submit" className="btn btn-success">
  //             Save Designation
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const currentUsername = loggedInUser?.username || "";
export default function AddDesignationComponent() {
  const [formData, setFormData] = useState({
    masterDesignationCode: '',
    designationDescription: '',
   createdBy: currentUsername,
    createdDate: new Date().toISOString(),
    isDeleted: 'No',
  });

  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFieldErrors({});

    try {
      await axios.post('http://localhost:8080/api/designation', formData);
      setMessage('Designation added successfully.');
      setTimeout(() => navigate('/designation'), 1500);
    } catch (error) {
      const data = error?.response?.data;

      if (data && typeof data === 'object') {
        const errors = {};
        Object.entries(data).forEach(([key, val]) => {
          if (typeof val === 'string') {
            errors[key] = val
              .split(/[\n|]+/)
              .map((str) => str.trim())
              .filter(Boolean)
              .join(' | ');
          } else {
            errors[key] = JSON.stringify(val);
          }
        });
        setFieldErrors(errors);
      } else if (typeof data === 'string') {
        setFieldErrors({ general: data });
      } else {
        setFieldErrors({ general: 'Failed to add designation.' });
      }
    }
  };

  return (
    <div className="container mt-4">
      <HeaderComponent />
      <h2 className="text-primary mb-4 main-content">Add New Designation</h2>

      {/* General Error Message */}
      {fieldErrors.general && (
        <div className="alert alert-danger">{fieldErrors.general}</div>
      )}

      {/* Success Message */}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Designation Code */}
        <div className="mb-3">
          <label className="form-label">Designation Code <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className={`form-control ${fieldErrors.masterDesignationCode ? 'is-invalid' : ''}`}
            name="masterDesignationCode"
            value={formData.masterDesignationCode}
            onChange={handleChange}
            maxLength={20}
          />
          {fieldErrors.masterDesignationCode && (
            <div className="invalid-feedback">{fieldErrors.masterDesignationCode}</div>
          )}
        </div>

        {/* Designation Description */}
        <div className="mb-3">
          <label className="form-label">Designation Description <span style={{ color: 'red' }}>*</span></label>
          <textarea
            className={`form-control ${fieldErrors.designationDescription ? 'is-invalid' : ''}`}
            name="designationDescription"
            value={formData.designationDescription}
            onChange={handleChange}
            rows={3}
          />
          {fieldErrors.designationDescription && (
            <div className="invalid-feedback">{fieldErrors.designationDescription}</div>
          )}
        </div>

        {/* Created By */}
        <div className="mb-3">
          <label className="form-label">Created By</label>
          <input
            type="text"
            className={`form-control ${fieldErrors.createdBy ? 'is-invalid' : ''}`}
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
          {fieldErrors.createdBy && (
            <div className="invalid-feedback">{fieldErrors.createdBy}</div>
          )}
        </div>

        {/* Created Date (read-only) */}
        <div className="mb-3">
          <label className="form-label">Created Date</label>
          <input
            type="date"
            className="form-control"
            name="createdDate"
            value={formData.createdDate ? formData.createdDate.split('T')[0] : ''}
            readOnly
          />
        </div>

      {/* Hidden IsDeleted Field */}
<input
  type="hidden"
  name="isDeleted"
  value={formData.isDeleted}
/>


        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/designation')}
          >
            Back to List
          </button>
          <button type="submit" className="btn btn-primary">
            Add Designation
          </button>
        </div>
      </form>
    </div>
  );
}
