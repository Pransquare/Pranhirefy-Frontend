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
 
 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
 
export default function AddDesignationComponent() {
  const [formData, setFormData] = useState({
    masterDesignationCode: '',
    designationDescription: '',
    createdBy: '',
    createdDate: new Date().toISOString(), // e.g. 2025-05-15T13:30:00.000Z
  });
 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/designation', formData);
      setMessage('Designation added successfully.');
      setTimeout(() => navigate('/designation'), 2000); // Redirect back after success
    } catch (error) {
      console.error('Error adding designation:', error);
      setMessage('Failed to add designation.');
    }
  };
 
  return (
    <div className="container mt-4">
      <HeaderComponent />
      <h2 className="text-primary mb-4 main-content">Add New Designation</h2>
 
      {message && <div className="alert alert-info">{message}</div>}
 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Designation Code</label>
          <input
            type="text"
            className="form-control"
            name="masterDesignationCode"
            value={formData.masterDesignationCode}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Designation Description</label>
          <input
            type="text"
            className="form-control"
            name="designationDescription"
            value={formData.designationDescription}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Created By</label>
          <input
            type="text"
            className="form-control"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Created Date</label>
          <input
            type="text"
            className="form-control"
            value={formData.createdDate}
            readOnly
          />
        </div>
 
        {/* Buttons container */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/designation')}
          >
            Back to List
          </button>
 
          <button type="submit" className="btn btn-success">
            Save Designation
          </button>
        </div>
      </form>
    </div>
  );
}