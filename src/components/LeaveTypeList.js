import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AddLeaveTypeForm from '../components/AddLeaveTypeForm';
import { getLeaveTypes, deleteLeaveType } from '../services/LeaveTypeService';
import Modal from 'bootstrap/js/dist/modal';

const LeaveTypeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [filteredLeaveTypes, setFilteredLeaveTypes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
      setFilteredLeaveTypes(data);
      return data;
    } catch (error) {
      console.error('Error fetching leave types', error);
      return [];
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchError(true);
      setFilteredLeaveTypes(leaveTypes);
    } else {
      setSearchError(false);
      const filtered = leaveTypes.filter(item =>
        item.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLeaveTypes(filtered);
      setCurrentPage(1);
    }
  };
  const handleAddClick = () => {
    navigate('/leavetypes/add');
  };
  const handleClear = () => {
    setSearchTerm('');
    setFilteredLeaveTypes(leaveTypes);
    setEditData(null);
    setSearchError(false);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredLeaveTypes.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleView = (id) => {
    navigate(`/leavetypes/view/${id}`);
  };

  // const handleEdit = (item) => {
  //   setEditData(item);
  //   setShowAddForm(true);
  // };
  const handleEditClick = (leaveType) => {
    navigate(`/leavetypes/edit/${leaveType.id}`, {
      state: { leaveType } // pass data using `state`
    });
  };
  const handleDelete = (item) => {
    setDeleteItem(item);
    const modalElement = document.getElementById('deleteConfirmModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const confirmDelete = async () => {
    if (deleteItem?.id) {
      try {
        await deleteLeaveType(deleteItem.id);
        const data = await fetchLeaveTypes();
        setLeaveTypes(data);
        setFilteredLeaveTypes(data);
      } catch (error) {
        console.error('Error deleting leave type', error);
      }
      setDeleteItem(null);
      const modalElement = document.getElementById('deleteConfirmModal');
      const modal = Modal.getInstance(modalElement);
      modal.hide();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaveTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeaveTypes.length / itemsPerPage);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Leave Type Management</h2>

      <div className="row g-2 mb-3 align-items-end">
        <div className="col-md-6">
          <input
            type="text"
            className={`form-control ${searchError ? 'is-invalid' : ''}`}
            placeholder="Search by Description"
            value={searchTerm}
            onChange={handleSearchChange}
            disabled={showAddForm}
          />
          {searchError && (
            <div className="invalid-feedback">Description is required for search.</div>
          )}
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-secondary w-50"
            onClick={handleClear}
            disabled={showAddForm}
          >
            Clear
          </button>
        </div>

        <div className="col-md-4 text-end">
          {/* <button
            className="btn btn-success"
            onClick={() => {
              setShowAddForm(prev => !prev);
              setEditData(null);
              setSearchError(false);
            }}
          >
            {showAddForm ? 'Close Form' : 'Add Leave Type'}
          </button> */}

<button type="submit" className="btn btn-primary px-4" onClick={handleAddClick}>
            {editData ? 'Update' : 'Add'} Leave Type
          </button>
        </div>
      </div>

      {/* {showAddForm && (
        <div className="mb-4">
          <AddLeaveTypeForm
            onSuccess={async () => {
              const data = await fetchLeaveTypes();
              setLeaveTypes(data);
              setShowAddForm(false);
              setEditData(null);
            }}
            editData={editData}
          />
        </div>
      )} */}

      {!showAddForm && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Description</th>
                <th>Status</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => handleView(item.id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success me-1"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-3">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredLeaveTypes.length > itemsPerPage && (
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${
                      currentPage === pageNum
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteConfirmModal"
        tabIndex="-1"
        aria-labelledby="deleteConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmLabel">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the leave type: <strong>{deleteItem?.description}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTypeList;



































































// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import AddLeaveTypeForm from './AddLeaveTypeForm ';
// import { getLeaveTypes, deleteLeaveType } from './LeaveTypeService';

// const LeaveTypeList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [leaveTypes, setLeaveTypes] = useState([]);
//  const [filteredLeaveTypes, setFilteredLeaveTypes] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [searchError, setSearchError] = useState(false);
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   const fetchLeaveTypes = async () => {
//     try {
//       const data = await getLeaveTypes();
//       setLeaveTypes(data);
//       setFilteredLeaveTypes(data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching leave types', error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchLeaveTypes();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     if (e.target.value.trim() !== '') {
//       setSearchError(false);
//     }
//   };

//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       setSearchError(true);
     
//       return;
//     }

//     const filtered = leaveTypes.filter(item =>
//       item.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredLeaveTypes(filtered);
//     setCurrentPage(1);
//   };

//   const handleClear = () => {
//     setSearchTerm('');
//     setFilteredLeaveTypes(leaveTypes);
//     setEditData(null);
//     setSearchError(false);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= Math.ceil(filteredLeaveTypes.length / itemsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleView = (id) => {
//     navigate(`/view/${id}`);
//   };

//   const handleEdit = (item) => {
//     setEditData(item);
//     setShowAddForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this leave type?')) {
//       try {
//         await deleteLeaveType(id);
//         const data = await fetchLeaveTypes();
//         setLeaveTypes(data);
//       } catch (error) {
//         console.error('Error deleting leave type', error);
//       }
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredLeaveTypes.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredLeaveTypes.length / itemsPerPage);

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">Leave Type Management</h2>

//       <div className="row g-2 mb-3 align-items-end">
//         <div className="col-md-4">
//           <input
//             type="text"
//             className={`form-control ${searchError ? 'is-invalid' : ''}`}
//             placeholder="Search by Description"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             disabled={showAddForm}
//           />
//           {searchError && (
//             <div className="invalid-feedback">Description is required for search.</div>
//           )}
//         </div>
//         <div className="col-md-2">
//           <button
//             className="btn btn-primary w-100"
//             onClick={handleSearch}
//             disabled={showAddForm}
//           >
//             Search
//           </button>
//         </div>
//         <div className="col-md-2">
//           <button
//             className="btn btn-secondary w-100"
//             onClick={handleClear}
//             disabled={showAddForm}
//           >
//             Clear
//           </button>
//         </div>
//         <div className="col-md-4 text-end">
//           <button
//             className="btn btn-success"
//             onClick={() => {
//               setShowAddForm(prev => !prev);
//               setEditData(null);
//               setSearchError(false);
//             }}
//           >
//             {showAddForm ? 'Close Form' : 'Add Leave Type'}
//           </button>
//         </div>
//       </div>

//       {showAddForm && (
//         <div className="mb-4">
//           <AddLeaveTypeForm
//             onSuccess={async () => {
//               const data = await fetchLeaveTypes();
//               setLeaveTypes(data);
//               setShowAddForm(false);
//               setEditData(null);
//             }}
//             editData={editData}
//           />
//         </div>
//       )}

//       {!showAddForm && (
//         <div className="table-responsive">
//           <table className="table table-bordered align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>ID</th>
//                 <th>Code</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th style={{ width: '140px' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map(item => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.code}</td>
//                     <td>{item.description}</td>
//                     <td>{item.status}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-outline-primary me-1"
//                         onClick={() => handleView(item.id)}
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-success me-1"
//                         onClick={() => handleEdit(item)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-3">
//                     No records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {filteredLeaveTypes.length > itemsPerPage && (
//             <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 &laquo;
//               </button>

//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNum = index + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     className={`btn btn-sm ${
//                       currentPage === pageNum
//                         ? 'btn-primary'
//                         : 'btn-outline-secondary'
//                     }`}
//                     onClick={() => handlePageChange(pageNum)}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 &raquo;
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveTypeList;
