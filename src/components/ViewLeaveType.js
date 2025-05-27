// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getLeaveTypes, updateLeaveType } from '../services/LeaveTypeService';
// import {
//   FaArrowLeft,
//   FaIdBadge,
//   FaCode,
//   FaInfoCircle,
//   FaToggleOn,
//   FaEdit,
//   FaSave,
//   FaTimes,
//   FaUser,
//   FaCalendar,
//   FaInfinity,
//   FaRedo,
//   FaPlusCircle
// } from 'react-icons/fa';

// const ViewLeaveType = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [leaveType, setLeaveType] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchLeaveType = async () => {
//       try {
//         const all = await getLeaveTypes();
//         const matched = all.find(item => item.id.toString() === id);
//         setLeaveType(matched);
//         setEditedData(matched);
//       } catch (error) {
//         console.error('Error fetching leave type', error);
//       }
//     };
//     fetchLeaveType();
//   }, [id]);

//   const handleEditToggle = () => setIsEditing(true);

//   const handleCancel = () => {
//     setEditedData(leaveType);
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     try {
//       await updateLeaveType(editedData.id, editedData);
//       setLeaveType(editedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update leave type', error);
//     }
//   };

//   const handleChange = e => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
//     setEditedData(prev => ({ ...prev, [name]: newValue }));
//   };

//   if (!leaveType) {
//     return <div className="container py-4">Loading...</div>;
//   }

//   return (
//     <div className="container py-4">
//       <div className="card shadow-sm border-primary">
//         <div className="card-body">
//           <h4 className="card-title text-primary mb-3">
//             <FaInfoCircle className="me-2" /> Leave Type Details
//           </h4>

//           <p><strong><FaIdBadge className="me-2" />ID:</strong> {leaveType.id}</p>

//           {isEditing ? (
//             <>
//               <div className="mb-2">
//                 <label><strong><FaCode className="me-2" />Code:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="code"
//                   value={editedData.code}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaInfoCircle className="me-2" />Description:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="description"
//                   value={editedData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaToggleOn className="me-2" />Status:</strong></label>
//                 <select
//                   className="form-select"
//                   name="status"
//                   value={editedData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaUser className="me-2" />Created By:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="createdBy"
//                   value={editedData.createdBy}
//                   onChange={handleChange}
//                   readOnly
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaUser className="me-2" />Modified By:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="modifiedBy"
//                   value={editedData.modifiedBy}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaCalendar className="me-2" />Created Date:</strong></label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="createdDate"
//                   value={editedData.createdDate?.slice(0, 16) || ''}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaCalendar className="me-2" />Modified Date:</strong></label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   name="modifiedDate"
//                   value={editedData.modifiedDate?.slice(0, 16) || ''}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-check mb-2">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   name="isUnlimited"
//                   checked={editedData.isUnlimited || false}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label">
//                   <FaInfinity className="me-2" /> Is Unlimited
//                 </label>
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaRedo className="me-2" />Credit Frequency:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="creditFrequency"
//                   value={editedData.creditFrequency || ''}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label><strong><FaPlusCircle className="me-2" />Leave Credit:</strong></label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   className="form-control"
//                   name="leaveCredit"
//                   value={editedData.leaveCredit || ''}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="text-end mt-3">
//                 <button className="btn btn-success me-2" onClick={handleSave}>
//                   <FaSave className="me-1" /> Save
//                 </button>
//                 <button className="btn btn-secondary" onClick={handleCancel}>
//                   <FaTimes className="me-1" /> Cancel
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <p><strong><FaCode className="me-2" />Code:</strong> {leaveType.code}</p>
//               <p><strong><FaInfoCircle className="me-2" />Description:</strong> {leaveType.description}</p>
//               <p><strong><FaToggleOn className="me-2" />Status:</strong> {leaveType.status}</p>
//               <p><strong><FaUser className="me-2" />Created By:</strong> {leaveType.createdBy}</p>
//               <p><strong><FaUser className="me-2" />Modified By:</strong> {leaveType.modifiedBy}</p>
//               <p><strong><FaCalendar className="me-2" />Created Date:</strong> {leaveType.createdDate}</p>
//               <p><strong><FaCalendar className="me-2" />Modified Date:</strong> {leaveType.modifiedDate}</p>
//               <p><strong><FaInfinity className="me-2" />Is Unlimited:</strong> {leaveType.isUnlimited ? 'Yes' : 'No'}</p>
//               <p><strong><FaRedo className="me-2" />Credit Frequency:</strong> {leaveType.creditFrequency}</p>
//               <p><strong><FaPlusCircle className="me-2" />Leave Credit:</strong> {leaveType.leaveCredit}</p>

//               <div className="text-end mt-3">
//                 <button className="btn btn-primary me-2" onClick={handleEditToggle}>
//                   <FaEdit className="me-2" /> Edit
//                 </button>
//                 <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//                   <FaArrowLeft className="me-2" /> Back
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewLeaveType;












import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeaveTypes } from '../services/LeaveTypeService';
import {
  FaArrowLeft, FaIdBadge, FaCode, FaInfoCircle, FaToggleOn, FaEdit,
  FaUser, FaCalendar, FaInfinity, FaRedo, FaPlusCircle
} from 'react-icons/fa';

const ViewLeaveType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState(null);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const all = await getLeaveTypes();
        const matched = all.find(item => item.id.toString() === id);
        setLeaveType(matched);
      } catch (error) {
        console.error('Error fetching leave type', error);
      }
    };
    fetchLeaveType();
  }, [id]);

  const handleEditToggle = () => {
    navigate('/leavetypes/add', { state: { leaveType } });
  };

  if (!leaveType) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-primary">
        <div className="card-body">
          <h4 className="card-title text-primary mb-3">
            <FaInfoCircle className="me-2" /> Leave Type Details
          </h4>

          <p><strong><FaIdBadge className="me-2" />ID:</strong> {leaveType.id}</p>
          <p><strong><FaCode className="me-2" />Code:</strong> {leaveType.code}</p>
          <p><strong><FaInfoCircle className="me-2" />Description:</strong> {leaveType.description}</p>
          <p><strong><FaToggleOn className="me-2" />Status:</strong> {leaveType.status}</p>
          <p><strong><FaUser className="me-2" />Created By:</strong> {leaveType.createdBy}</p>
          <p><strong><FaUser className="me-2" />Modified By:</strong> {leaveType.modifiedBy}</p>
          <p><strong><FaCalendar className="me-2" />Created Date:</strong> {leaveType.createdDate}</p>
          <p><strong><FaCalendar className="me-2" />Modified Date:</strong> {leaveType.modifiedDate}</p>
          {/* <p><strong><FaInfinity className="me-2" />Is Unlimited:</strong> {leaveType.isUnlimited ? 'Yes' : 'No'}</p> */}
          <p><strong><FaRedo className="me-2" />Credit Frequency:</strong> {leaveType.creditFrequency}</p>
          <p><strong><FaPlusCircle className="me-2" />Leave Credit:</strong> {leaveType.leaveCredit}</p>

          <div className="text-end mt-3">
            <button className="btn btn-primary me-2" onClick={handleEditToggle}>
              <FaEdit className="me-2" /> Edit
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-2" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeaveType;


















































































// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getLeaveTypes, updateLeaveType } from './LeaveTypeService';
// import {
//   FaArrowLeft,
//   FaIdBadge,
//   FaCode,
//   FaInfoCircle,
//   FaToggleOn,
//   FaEdit,
//   FaSave,
//   FaTimes
// } from 'react-icons/fa';

// const ViewLeaveType = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [leaveType, setLeaveType] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchLeaveType = async () => {
//       try {
//         const all = await getLeaveTypes();
//         const matched = all.find(item => item.id.toString() === id);
//         setLeaveType(matched);
//         setEditedData(matched);
//       } catch (error) {
//         console.error('Error fetching leave type', error);
//       }
//     };
//     fetchLeaveType();
//   }, [id]);

//   const handleEditToggle = () => setIsEditing(true);

//   const handleCancel = () => {
//     setEditedData(leaveType);
//     setIsEditing(false);
//   };

//   const handleSave = async () => {
//     try {
//       await updateLeaveType(editedData.id, editedData);
//       setLeaveType(editedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update leave type', error);
//     }
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setEditedData(prev => ({ ...prev, [name]: value }));
//   };

//   if (!leaveType) {
//     return <div className="container py-4">Loading...</div>;
//   }

//   return (
//     <div className="container py-4">
//       <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
//         <FaArrowLeft className="me-2" /> Back
//       </button>

//       <div className="card shadow-sm border-primary">
//         <div className="card-body">
//           <h4 className="card-title text-primary mb-3">
//             <FaInfoCircle className="me-2" /> Leave Type Details
//           </h4>

//           <p><strong><FaIdBadge className="me-2" />ID:</strong> {leaveType.id}</p>

//           {isEditing ? (
//             <>
//               <div className="mb-2">
//                 <label><strong><FaCode className="me-2" />Code:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="code"
//                   value={editedData.code}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label><strong><FaInfoCircle className="me-2" />Description:</strong></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="description"
//                   value={editedData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label><strong><FaToggleOn className="me-2" />Status:</strong></label>
//                 <select
//                   className="form-select"
//                   name="status"
//                   value={editedData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <button className="btn btn-success me-2" onClick={handleSave}>
//                 <FaSave className="me-1" /> Save
//               </button>
//               <button className="btn btn-secondary" onClick={handleCancel}>
//                 <FaTimes className="me-1" /> Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <p><strong><FaCode className="me-2" />Code:</strong> {leaveType.code}</p>
//               <p><strong><FaInfoCircle className="me-2" />Description:</strong> {leaveType.description}</p>
//               <p><strong><FaToggleOn className="me-2" />Status:</strong> {leaveType.status}</p>
//               <button className="btn btn-primary mt-2" onClick={handleEditToggle}>
//                 <FaEdit className="me-2" /> Edit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewLeaveType;
