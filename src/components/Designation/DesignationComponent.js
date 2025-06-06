
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEye, FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import HeaderComponent from '../HeaderComponent';
// import '../../DesignationComponent.css';
// import { Modal } from 'bootstrap';
// import NavbarSidebar from '../Sidebar';
// // import Sidebar from '../Sidebar'; // Adjust path if necessary

// // Yup schema - keyword is optional now for instant search
// const schema = yup.object().shape({
//   keyword: yup.string(),
// });

// export default function DesignationComponent() {
//   const [designations, setDesignations] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [designationToDelete, setDesignationToDelete] = useState(null);
//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   const {
//     register,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: { keyword: '' },
//   });

//   // Watch the keyword input for instant search
//   const keyword = watch('keyword');

//   // Load all designations on mount
//   useEffect(() => {
//     const fetchAllDesignations = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/getAllDesignations');
//         setDesignations(response.data);
//       } catch (error) {
//         setErrorMessage('Failed to load designations.');
//       }
//     };
//     fetchAllDesignations();
//   }, []);

//   // Instant search effect triggered by keyword changes
//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (!keyword) {
//         // If input empty, load all designations
//         try {
//           const response = await axios.get('http://localhost:8080/api/getAllDesignations');
//           setDesignations(response.data);
//           setErrorMessage('');
//           setCurrentPage(1);
//         } catch (error) {
//           setErrorMessage('Failed to load designations.');
//         }
//       } else {
//         // Search by keyword
//         try {
//           const response = await axios.get(`http://localhost:8080/api/search?keyword=${keyword}`);
//           if (response.data.length === 0) {
//             setDesignations([]);
//             setErrorMessage('No such designation found.');
//           } else {
//             setDesignations(response.data);
//             setErrorMessage('');
//             setCurrentPage(1);
//           }
//         } catch (error) {
//           setErrorMessage('Failed to fetch data.');
//         }
//       }
//     };

//     fetchSearchResults();
//   }, [keyword]);

//   // Clear search input and reload all designations
//   const handleClear = () => {
//     reset({ keyword: '' });
//     setErrorMessage('');
//   };

//   const handleView = (designation) => {
//     navigate(`/designation/${designation.masterDesignationId}`);
//   };

//   const handleEdit = (designation) => {
//     navigate(`/designation/${designation.masterDesignationId}`, { state: { isEditing: true } });
//   };

//   const handleDelete = (designation) => {
//     setDesignationToDelete(designation);
//     const modalElement = document.getElementById('deleteModal');
//     if (modalElement) {
//       const deleteModal = Modal.getOrCreateInstance(modalElement);
//       deleteModal.show();
//     } else {
//       console.error('Modal element not found');
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       const id = designationToDelete.masterDesignationId;
//       await axios.delete(`http://localhost:8080/api/deleteDesignation/${id}`);
//       setDesignations((prev) => prev.filter((des) => des.masterDesignationId !== id));
//       setSuccessMessage('Designation deleted successfully.');
//       setErrorMessage('');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (error) {
//       setErrorMessage('Failed to delete designation.');
//       setSuccessMessage('');
//       setTimeout(() => setErrorMessage(''), 3000);
//     }
//   };

//   const totalPages = Math.ceil(designations.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = designations.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="container mt-4 mb-5">
//       {/* <HeaderComponent /> */}

//       <NavbarSidebar/>

//       <h2 className=" mt-5 pt-5 main-content" style={{color:"rgb(77,208,225)", fontWeight:"30px"}}>Designation Management</h2>
      

//       {/* Search input without Search button */}
//       <div className="row g-3 align-items-end">
//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Search Designation</label>
//           <input
//             type="text"
//             className={`form-control ${errors.keyword ? 'is-invalid' : ''}`}
//             {...register('keyword')}
//             placeholder="Type to search..."
//           />
//           {errors.keyword && <div className="invalid-feedback">{errors.keyword.message}</div>}
//         </div>

//         <div className="col-md-6 d-flex gap-2">
//           <button type="button" className="btn " style={{backgroundColor:"rgb(77,208,225)", color:"white"}} onClick={handleClear}>
//             Clear
//           </button>
//           <button
//             type="button"
//             className="btn btn-success ms-auto"
//             onClick={() => navigate('/add-designation')}
//           >
//             <FaPlus className="me-1" /> Add Designation
//           </button>
//         </div>
//       </div>

//       {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
//       {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

//       {currentItems.length > 0 && (
//         <div className="table-responsive mt-4">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Code</th>
//                 <th>Description</th>
//                 <th>Created By</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((des) => (
//                 <tr key={des.masterDesignationId}>
//                   <td>{des.masterDesignationId}</td>
//                   <td>{des.masterDesignationCode}</td>
//                   <td>{des.designationDescription}</td>
//                   <td>{des.createdBy}</td>
//                   <td>
//                     <button
//                       className="action-button view-button me-2"
//                       onClick={() => handleView(des)}
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       className="action-button edit-button me-2"
//                       onClick={() => handleEdit(des)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="action-button delete-button"
//                       onClick={() => handleDelete(des)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {totalPages > 1 && (
//         <nav aria-label="Page navigation example" className="mt-4">
//           <ul className="pagination justify-content-center align-items-center">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button
//                 className="page-link"
//                 onClick={handlePrev}
//                 style={{ fontSize: '1.4rem', padding: '0.5rem 0.9rem' }}
//                 aria-label="Previous"
//               >
//                 <FaChevronLeft />
//               </button>
//             </li>

//             {[...Array(totalPages)].map((_, idx) => {
//               const pageNumber = idx + 1;
//               return (
//                 <li
//                   key={pageNumber}
//                   className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
//                   style={{ margin: '0 4px' }}
//                 >
//                   <button
//                     onClick={() => paginate(pageNumber)}
//                     className="page-link"
//                     style={{
//                       fontSize: currentPage === pageNumber ? '1.3rem' : '1.1rem',
//                       fontWeight: currentPage === pageNumber ? '700' : '400',
//                       padding: '0.5rem 0.9rem',
//                       minWidth: '42px',
//                       borderRadius: '6px',
//                     }}
//                   >
//                     {pageNumber}
//                   </button>
//                 </li>
//               );
//             })}

//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button
//                 className="page-link"
//                 onClick={handleNext}
//                 style={{ fontSize: '1.4rem', padding: '0.5rem 0.9rem' }}
//                 aria-label="Next"
//               >
//                 <FaChevronRight />
//               </button>
//             </li>
//           </ul>
//         </nav>
//       )}

//       {/* Bootstrap Delete Confirmation Modal */}
//       <div
//         className="modal fade"
//         id="deleteModal"
//         tabIndex="-1"
//         aria-labelledby="deleteModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="deleteModalLabel">
//                 Confirm Deletion
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//               Are you sure you want to delete this designation?
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => {
//                   confirmDelete();
//                   const modalElement = document.getElementById('deleteModal');
//                   const modalInstance = Modal.getInstance(modalElement);
//                   modalInstance.hide();
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSidebar from '../Sidebar';
import { Modal } from 'bootstrap';
import '../../DesignationComponent.css';


const schema = yup.object().shape({
  keyword: yup.string(),
});

export default function DesignationComponent() {
  const [designations, setDesignations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [designationToDelete, setDesignationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const itemsPerPage = 5;
  const navigate = useNavigate();

  const {
    register,
    watch,
    reset,
    setError,   
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { keyword: '' },
  });

  const keyword = watch('keyword');

  // Fetch all designations
  const fetchAllDesignations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/getAllDesignations');
      setDesignations(response.data);
      setErrorMessage('');
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load designations.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDesignations();
  }, []);

 useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const fetchSearchResults = async () => {
      if (!keyword) {
        await fetchAllDesignations();
        setCurrentPage(1);
      } else {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/api/search?keyword=${encodeURIComponent(keyword)}`);
          if (response.data.length === 0) {
            setDesignations([]);
            setErrorMessage('No such designation found.');
          } else {
            setDesignations(response.data);
            setErrorMessage('');
            setCurrentPage(1);
          }
          setLoading(false);
        } catch (error) {
  const backendMessage = error?.response?.data;

  if (backendMessage) {
    const message = Object.values(backendMessage)[0]; // Gets the first value from { error: "...", or createdBy: "..." }
    setErrorMessage(message);
  } else {
    setErrorMessage("Something went wrong");
  }

  setLoading(false);
}
      }
    };

    fetchSearchResults();
  }, 500); // delay in ms

  return () => clearTimeout(delayDebounce); // cleanup on unmount or re-run
}, [keyword]);


  const handleClear = () => {
    reset({ keyword: '' });
    setErrorMessage('');
    fetchAllDesignations();
    setCurrentPage(1);
  };

  const handleView = (designation) => {
    navigate(`/designation/${designation.masterDesignationId}`);
  };

  const handleEdit = (designation) => {
    navigate(`/designation/${designation.masterDesignationId}`, { state: { isEditing: true } });
  };

  const handleDelete = (designation) => {
    setDesignationToDelete(designation);
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const deleteModal = Modal.getOrCreateInstance(modalElement);
      deleteModal.show();
    } else {
      console.error('Modal element not found');
    }
  };

 const confirmDelete = async () => {
  if (!designationToDelete) return;

  setIsDeleting(true);
  try {
    const id = designationToDelete.masterDesignationId;
    await axios.delete(`http://localhost:8080/api/deleteDesignation/${id}`);
    setDesignations((prev) => prev.filter((des) => des.masterDesignationId !== id));
    setSuccessMessage('Designation deleted successfully.');
    setErrorMessage('');
    setDesignationToDelete(null);
    setTimeout(() => setSuccessMessage(''), 3000);

    // Close modal programmatically
    const modalElement = document.getElementById('deleteModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();

  } catch (error) {
    setErrorMessage('Failed to delete designation.');
    setSuccessMessage('');
    setTimeout(() => setErrorMessage(''), 3000);
  }
  setIsDeleting(false);
};


  const totalPages = Math.ceil(designations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-4 mb-5">

      <div className='NavbarSidebar'>
<NavbarSidebar />
      </div>
       
      
      

      <h2
        className="mt-5 pt-5 main-content"
        style={{ color: 'rgb(77,208,225)', fontWeight: '700' }}
      >
        Designation Management
      </h2>

      {/* Search input */}
      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Search Designation</label>
          <input
            type="text"
            className={`form-control ${errors.keyword ? 'is-invalid' : ''}`}
            {...register('keyword')}
            placeholder="Type to search..."
            disabled={loading}
          />
          {errors.keyword && <div className="invalid-feedback">{errors.keyword.message}</div>}
        </div>

        <div className="col-md-6 d-flex gap-2">
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: 'rgb(77,208,225)', color: 'white' }}
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-success ms-auto"
            onClick={() => navigate('/add-designation')}
            disabled={loading}
          >
            <FaPlus className="me-1" /> Add Designation
          </button>
        </div>
      </div>

      {loading && <div className="mt-3">Loading designations...</div>}

      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

      {currentItems.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((des) => (
                <tr key={des.masterDesignationId}>
                  <td>{des.masterDesignationId}</td>
                  <td>{des.masterDesignationCode}</td>
                  <td>{des.designationDescription}</td>
                  <td>{des.createdBy}</td>
                  <td>
                    <button
  className="action-button view-button me-2"
  onClick={() => handleView(des)}
  disabled={loading}
  title="View"
>
  <FaEye />
</button>

<button
  className="action-button edit-button me-2"
  onClick={() => handleEdit(des)}
  disabled={loading}
  title="Edit"
>
  <FaEdit />
</button>

<button
  className="action-button delete-button"
  onClick={() => handleDelete(des)}
  disabled={loading || isDeleting}
  title="Delete"
>
  <FaTrash />
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Page navigation example" className="mt-4">
          <ul className="pagination justify-content-center align-items-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={handlePrev}
                style={{ fontSize: '1.4rem', padding: '0.5rem 0.9rem' }}
                aria-label="Previous"
                disabled={loading}
              >
                <FaChevronLeft />
              </button>
            </li>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <li
                  key={pageNumber}
                  className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                  style={{ margin: '0 4px' }}
                >
                  <button
                    onClick={() => paginate(pageNumber)}
                    className="page-link"
                    style={{
                      fontSize: currentPage === pageNumber ? '1.3rem' : '1.1rem',
                      fontWeight: currentPage === pageNumber ? '700' : '400',
                      padding: '0.5rem 0.9rem',
                      minWidth: '42px',
                      borderRadius: '6px',
                    }}
                    disabled={loading}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={handleNext}
                style={{ fontSize: '1.4rem', padding: '0.5rem 0.9rem' }}
                aria-label="Next"
                disabled={loading}
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Delete Confirmation Modal */}
     <div
  className="modal fade"
  id="deleteModal"
  tabIndex="-1"
  aria-labelledby="deleteModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        Are you sure you want to delete this designation :
         <strong className="text-danger ms-1">
          {designationToDelete?.designationDescription}
        </strong>
        ?
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
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}
