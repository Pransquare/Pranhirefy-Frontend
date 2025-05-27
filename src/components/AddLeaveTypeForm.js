// import React, { useState, useEffect } from 'react';
// import { createLeaveType, updateLeaveType } from './LeaveTypeService';
// import { FaPlusCircle, FaEdit } from 'react-icons/fa';

// const AddLeaveTypeForm = ({ onSuccess, editData }) => {
//   const [formData, setFormData] = useState({
//     code: '',
//     description: '',
//     status: 'Active',
//     createdBy: 'admin',
//     modifiedBy: 'admin',
//     createdDate: new Date().toISOString().split('T')[0],
//     modifiedDate: new Date().toISOString().split('T')[0],
//     isUnlimited: false,
//     creditFrequency: '',
//     leaveCredit: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         ...editData,
//         createdDate: editData.createdDate?.split('T')[0] || '',
//         modifiedDate: editData.modifiedDate?.split('T')[0] || '',
//       });
//     }
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         code: parseInt(formData.code, 10),
//         leaveCredit: parseFloat(formData.leaveCredit)
//       };
//       if (editData) {
//         await updateLeaveType(editData.id, payload);
//         setMessage('✅ Leave type updated successfully!');
//       } else {
//         await createLeaveType(payload);
//         setMessage('✅ Leave type added successfully!');
//       }
//       setError('');
//       onSuccess?.();
//     } catch (err) {
//       setError('❌ Error saving leave type. Please try again.');
//       setMessage('');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="card shadow-sm p-4">
//       <h4 className="mb-3 text-primary d-flex align-items-center">
//         {editData ? <FaEdit className="me-2" /> : <FaPlusCircle className="me-2" />}
//         {editData ? 'Edit Leave Type' : 'Add Leave Type'}
//       </h4>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit} className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">Code <span className="text-danger">*</span></label>
//           <input type="number" name="code" value={formData.code} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Description <span className="text-danger">*</span></label>
//           <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Status</label>
//           <select name="status" value={formData.status} onChange={handleChange} className="form-select">
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>

//         <div className="col-md-6 d-flex align-items-center mt-4">
//           <div className="form-check">
//             <input type="checkbox" className="form-check-input" id="isUnlimited" name="isUnlimited" checked={formData.isUnlimited} onChange={handleChange} />
//             <label className="form-check-label ms-2" htmlFor="isUnlimited">Is Unlimited</label>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Credit Frequency</label>
//           <input type="text" name="creditFrequency" value={formData.creditFrequency} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Leave Credit</label>
//           <input type="number" step="0.01" name="leaveCredit" value={formData.leaveCredit} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Created Date</label>
//           <input type="date" name="createdDate" value={formData.createdDate} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Modified Date</label>
//           <input type="date" name="modifiedDate" value={formData.modifiedDate} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Created By</label>
//           <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Modified By</label>
//           <input type="text" name="modifiedBy" value={formData.modifiedBy} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-12 text-end">
//           <button type="submit" className="btn btn-primary px-4">
//             {editData ? 'Update' : 'Add'} Leave Type
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddLeaveTypeForm;
// // AddLeaveTypeForm.jsx or EditLeaveTypeForm.jsx
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { updateLeaveType, createLeaveType } from './LeaveTypeService';

// const AddLeaveTypeForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editingLeaveType = location.state?.leaveType;

//   const [formData, setFormData] = useState({
//     code: '',
//     description: '',
//     status: '',
//     isUnlimited: false,
//     creditFrequency: '',
//     leaveCredit: '',
//     createdBy: '',
//     modifiedBy: '',
//   });

//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState(''); // 'success' or 'error'

//   useEffect(() => {
//     if (editingLeaveType) {
//       setFormData({
//         ...editingLeaveType,
//         leaveCredit: editingLeaveType.leaveCredit ?? '',
//         isUnlimited: editingLeaveType.isUnlimited ?? false,
//         creditFrequency: editingLeaveType.creditFrequency ?? '',
//         createdBy: editingLeaveType.createdBy ?? '',
//         modifiedBy: editingLeaveType.modifiedBy ?? '',
//       });
//     }
//   }, [editingLeaveType]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === 'checkbox' ? checked : value;
//     setFormData(prev => ({ ...prev, [name]: val }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.code || !formData.description || !formData.status) {
//       setMessage('Please fill in all required fields: Code, Description, and Status.');
//       setMessageType('error');
//       return;
//     }

//     try {
//       if (editingLeaveType) {
//         await updateLeaveType(editingLeaveType.id, formData);
//         setMessage('Leave Type updated successfully.');
//         setMessageType('success');
//       } else {
//         await createLeaveType(formData);
//         setMessage('Leave Type created successfully.');
//         setMessageType('success');
//       }

//       setTimeout(() => {
//         navigate('/');
//       }, 1000);
//     } catch (error) {
//       console.error('Error saving leave type:', error);
//       setMessage('Failed to save leave type. Please try again.');
//       setMessageType('error');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>{editingLeaveType ? 'Edit' : 'Add'} Leave Type</h2>

//       {message && (
//         <div
//           className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}
//           role="alert"
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Code</label>
//           <input
//             type="text"
//             name="code"
//             value={formData.code}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Description</label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="form-control"
//             required
//           >
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="mb-3 form-check">
//           <input
//             type="checkbox"
//             name="isUnlimited"
//             checked={formData.isUnlimited}
//             onChange={handleChange}
//             className="form-check-input"
//             id="isUnlimitedCheck"
//           />
//           <label className="form-check-label" htmlFor="isUnlimitedCheck">
//             Is Unlimited
//           </label>
//         </div>

//         <div className="mb-3">
//           <label>Credit Frequency</label>
//           <select
//             name="creditFrequency"
//             value={formData.creditFrequency}
//             onChange={handleChange}
//             className="form-control"
//           >
//             <option value="">Select Frequency</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Quarterly">Quarterly</option>
//             <option value="Yearly">Yearly</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label>Leave Credit</label>
//           <input
//             type="number"
//             step="0.1"
//             name="leaveCredit"
//             value={formData.leaveCredit}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <label>Created By</label>
//           <input
//             type="text"
//             name="createdBy"
//             value={formData.createdBy}
//             onChange={handleChange}
//             className="form-control"
//             disabled={editingLeaveType}
//           />
//         </div>

//         <div className="mb-3">
//           <label>Modified By</label>
//           <input
//             type="text"
//             name="modifiedBy"
//             value={formData.modifiedBy}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <button className="btn btn-primary" type="submit">
//           {editingLeaveType ? 'Update' : 'Create'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddLeaveTypeForm;




// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { updateLeaveType, createLeaveType } from '../services/LeaveTypeService';

// const AddLeaveTypeForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editingLeaveType = location.state?.leaveType;

//   const [formData, setFormData] = useState({
//     id: null,
//     code: '',
//     description: '',
//     status: '',
//     createdBy: '',
//     modifiedBy: '',
//     createdDate: '',
//     modifiedDate: '',
//     creditFrequency: '',
//     leaveCredit: ''
//   });

//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');

//   useEffect(() => {
//     if (editingLeaveType) {
//       setFormData({
//         ...editingLeaveType,
//         code: editingLeaveType.code ?? '',
//         description: editingLeaveType.description ?? '',
//         status: editingLeaveType.status ?? '',
//         createdBy: editingLeaveType.createdBy ?? '',
//         modifiedBy: editingLeaveType.modifiedBy ?? '',
//         createdDate: editingLeaveType.createdDate ?? '',
//         modifiedDate: editingLeaveType.modifiedDate ?? '',
//         creditFrequency: editingLeaveType.creditFrequency ?? '',
//         leaveCredit: editingLeaveType.leaveCredit ?? ''
//       });
//     }
//   }, [editingLeaveType]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.code || !formData.description || !formData.status) {
//       setMessage('Please fill in all required fields: Code, Description, and Status.');
//       setMessageType('error');
//       return;
//     }

//     try {
//       if (editingLeaveType) {
//         const updatedFormData = {
//           ...formData,
//           modifiedBy: 'admin',
//           modifiedDate: new Date().toISOString()
//         };
//         await updateLeaveType(formData.id, updatedFormData);
//         setMessage('Leave Type updated successfully.');
//         setMessageType('success');
//       } else {
//         const createdFormData = {
//           ...formData,
//           createdBy: 'admin',
//           createdDate: new Date().toISOString()
//         };
//         await createLeaveType(createdFormData);
//         setMessage('Leave Type created successfully.');
//         setMessageType('success');
//       }

//       setTimeout(() => {
//         navigate('/leavetypes');
//       }, 1000);
//     } catch (error) {
//       console.error('Error saving leave type:', error);
//       setMessage('Failed to save leave type. Please try again.');
//       setMessageType('error');
//     }
//   };

//   const handleClose = () => {
//     navigate('/leavetypes');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="shadow p-4 rounded border bg-white">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4 className="mb-0 text-primary">{editingLeaveType ? 'Edit' : 'Add'} Leave Type</h4>
//         </div>

//         {message && (
//           <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             {formData.id && (
//               <div className="col-md-6 mb-3">
//                 <label>ID</label>
//                 <input type="text" className="form-control" value={formData.id} disabled />
//               </div>
//             )}

//             <div className="col-md-6 mb-3">
//               <label>Code</label>
//               <input
//                 type="number"
//                 name="code"
//                 value={formData.code}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               >
//                 <option value="">Select Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Credit Frequency</label>
//               <select
//                 name="creditFrequency"
//                 value={formData.creditFrequency}
//                 onChange={handleChange}
//                 className="form-control"
//               >
//                 <option value="">Select Frequency</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Quarterly">Quarterly</option>
//                 <option value="Yearly">Yearly</option>
//               </select>
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Leave Credit</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 name="leaveCredit"
//                 value={formData.leaveCredit}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Created By</label>
//               <input
//                 type="text"
//                 name="createdBy"
//                 value={formData.createdBy}
//                 onChange={handleChange}
//                 className="form-control"
//                 readOnly={!!editingLeaveType}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Created Date</label>
//               <input
//                 type="datetime-local"
//                 name="createdDate"
//                 value={formData.createdDate ? formData.createdDate.substring(0, 16) : ''}
//                 onChange={handleChange}
//                 className="form-control"
//                 readOnly={!!editingLeaveType}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Modified By</label>
//               <input
//                 type="text"
//                 name="modifiedBy"
//                 value={formData.modifiedBy}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Modified Date</label>
//               <input
//                 type="datetime-local"
//                 name="modifiedDate"
//                 value={formData.modifiedDate ? formData.modifiedDate.substring(0, 16) : ''}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//           </div>

//           <div className="d-flex justify-content-end gap-2 mt-4">
//             <button type="button" className="btn btn-secondary" onClick={handleClose}>
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary">
//               {editingLeaveType ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLeaveTypeForm;









import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateLeaveType, createLeaveType } from '../services/LeaveTypeService';

const AddLeaveTypeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingLeaveType = location.state?.leaveType;

  const [formData, setFormData] = useState({
    id: null,
    code: '',
    description: '',
    status: '',
    createdBy: '',
    modifiedBy: '',
    createdDate: '',
    modifiedDate: '',
    creditFrequency: '',
    leaveCredit: '',
    isUnlimited: false
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (editingLeaveType) {
      setFormData({
        ...editingLeaveType,
        code: editingLeaveType.code ?? '',
        description: editingLeaveType.description ?? '',
        status: editingLeaveType.status ?? '',
        createdBy: editingLeaveType.createdBy ?? '',
        modifiedBy: editingLeaveType.modifiedBy ?? '',
        createdDate: editingLeaveType.createdDate?.slice(0, 16) ?? '',
        modifiedDate: editingLeaveType.modifiedDate?.slice(0, 16) ?? '',
        creditFrequency: editingLeaveType.creditFrequency ?? '',
        leaveCredit: editingLeaveType.leaveCredit ?? '',
        isUnlimited: editingLeaveType.isUnlimited ?? false
      });
    } else {
      const now = new Date().toISOString().slice(0, 16);
      setFormData((prev) => ({
        ...prev,
        createdBy: 'admin',
        createdDate: now,
        modifiedBy: 'admin',
        modifiedDate: now
      }));
    }
  }, [editingLeaveType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.description || !formData.status) {
      setMessage('Please fill in all required fields: Code, Description, and Status.');
      setMessageType('error');
      return;
    }

    try {
      if (editingLeaveType) {
        const updatedFormData = {
          ...formData,
          modifiedBy: 'admin',
          modifiedDate: new Date().toISOString().slice(0, 16)
        };
        await updateLeaveType(formData.id, updatedFormData);
        setMessage('Leave Type updated successfully.');
        setMessageType('success');
      } else {
        const createdFormData = {
          ...formData,
          createdBy: 'admin',
          createdDate: formData.createdDate,
          modifiedBy: 'admin',
          modifiedDate: formData.modifiedDate
        };
        await createLeaveType(createdFormData);
        setMessage('Leave Type created successfully.');
        setMessageType('success');
      }

      setTimeout(() => {
        navigate('/leavetypes');
      }, 1000);
    } catch (error) {
      console.error('Error saving leave type:', error);
      setMessage('Failed to save leave type. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="shadow p-4 rounded border bg-white">
        <h4 className="mb-4 text-primary">{editingLeaveType ? 'Edit' : 'Add'} Leave Type</h4>

        {message && (
          <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            {formData.id && (
              <div className="col-md-6 mb-3">
                <label>ID</label>
                <input type="text" className="form-control" value={formData.id} disabled />
              </div>
            )}

            <div className="col-md-6 mb-3">
              <label>Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Credit Frequency</label>
              <input
                type="text"
                name="creditFrequency"
                value={formData.creditFrequency}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Leave Credit</label>
              <input
                type="number"
                name="leaveCredit"
                value={formData.leaveCredit}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3 form-check mt-4">
              <input
                type="checkbox"
                name="isUnlimited"
                className="form-check-input"
                checked={formData.isUnlimited}
                onChange={handleChange}
              />
              <label className="form-check-label">Is Unlimited</label>
            </div>

            <div className="col-md-6 mb-3">
              <label>Created By</label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="form-control"
                // disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Created Date</label>
              <input
                type="datetime-local"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Modified By</label>
              <input
                type="text"
                name="modifiedBy"
                value={formData.modifiedBy}
                onChange={handleChange}
                className="form-control"
                // disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Modified Date</label>
              <input
                type="datetime-local"
                name="modifiedDate"
                value={formData.modifiedDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-primary me-2">
                {editingLeaveType ? 'Update' : 'Create'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/leavetypes')}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveTypeForm;
