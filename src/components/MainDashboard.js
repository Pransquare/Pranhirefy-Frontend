
import React, { useEffect,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from './avatar.avif';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import '../MainDashboard.css';
import { Link } from 'react-router-dom';




const schema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().min(6, 'New password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const DashboardMain = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
   const [openMain, setOpenMain] = useState(""); // 'admin' | 'hr' | ''
    const [openSubAdmin, setOpenSubAdmin] = useState(false); // Configuration
  const [openSubMasters, setOpenSubMasters] = useState(false); // Masters
  const [openSubHR, setOpenSubHR] = useState(false); // Tools
const [openSubIT, setOpenSubIT] = useState(false);
const [openSubFinance, setOpenSubFinance] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
       console.log('Change Password clicked');
  };

  const handleChangePassword = () => {
    setShowModal(true);
       console.log('Change Password clicked');
  };

  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  };

 // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



const onSubmit = async (data) => {
  try {
    const userId = user.userId || user.id;
    if (!userId) {
      alert('User ID is missing. Please login again.');
      return;
    }

    // 1. Get the user details
    const response = await axios.get(`http://localhost:8080/api/login-users/${encodeURIComponent(userId)}`);
    const existingUser = response.data;

    // 2. Verify old password by calling backend login API
    try {
      await axios.post('http://localhost:8080/api/login-users/login', {
        username: existingUser.username,
        password: data.oldPassword,
      });
    } catch {
      alert('Old password is incorrect.');
      return;
    }

    // 3. Prepare updated user object (password will be encoded in backend)
    const updatedUser = {
      ...existingUser,
      password: data.newPassword,
      modifiedDate: new Date().toISOString(),
    };

    // 4. Update user with new password via PUT
    await axios.put(`http://localhost:8080/api/login-users/${encodeURIComponent(userId)}`, updatedUser);

    alert('Password changed successfully!');
    handleCloseModal();
  } catch (error) {
    console.error('Error changing password:', error);
    alert('Failed to change password');
  }
};

  if (!user) return null;
  

  const toggleMainMenu = (menu) => {
    if (menu === openMain) {
      setOpenMain(""); // Collapse if already open
    } else {
      setOpenMain(menu); // Open clicked menu
      // Reset submenus when switching main menus
      setOpenSubAdmin(false);
      setOpenSubMasters(false);
      setOpenSubHR(false);
       setOpenSubIT(false);
      setOpenSubFinance(false);
    }
  };
  const handleRouteChange = () => {
  document.body.classList.remove('modal-open', 'offcanvas-open');
  document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop').forEach(el => el.remove());
};
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg horizontal-menu px-3 shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-light btn-sm me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <i className="bi bi-list fs-5"></i>
          </button>
          <span className="navbar-brand mb-0 h5 text-white">PranHirefy</span>
        </div>
        


    <div className="position-relative d-flex align-items-center justify-content-end" ref={menuRef}>
  <button
    className="btn btn-outline-primary  p-2"
    onClick={() => setShowMenu(prev => !prev)}
    aria-label="User menu"
     style={{ background: "transparent", border: "none", cursor: "pointer" }}
  >
    <i className="bi bi-person-circle fs-4 text-white"></i>
  </button>

  {showMenu && (
    <ul
      style={{
        position: "absolute",
        top: "55px",
        right: 0,
        minWidth: "180px",
        zIndex: 1050,
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        background: "white",
        backdropFilter: "blur(8px)",
      }}
      className="p-2 animate__animated animate__fadeIn"
    >
      {/* Optional arrow pointer */}
      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "10px",
          width: "16px",
          height: "16px",
          background: "white",
          transform: "rotate(45deg)",
          boxShadow: "-2px -2px 4px rgba(0,0,0,0.05)",
          borderTopLeftRadius: "0.2rem",
          zIndex: -1,
        }}
      />

      <li>
        <button
          className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
          onClick={handleChangePassword}
          style={{ padding: "10px 16px", transition: "background-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f8ff"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <i className="bi bi-key-fill text-primary"></i> Change Password
        </button>
      </li>
      <li>
        <button
          className="dropdown-item d-flex align-items-center gap-2 fw-semibold"
          onClick={handleLogout}
          style={{ padding: "10px 16px", transition: "background-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8d7da"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <i className="bi bi-box-arrow-right text-danger"></i> Logout
        </button>
      </li>
    </ul>
  )}
</div>

  </div>

   
      </nav>

      



      {/* Sidebar Offcanvas */}
        {/* Sidebar Offcanvas */}
<div
  className="offcanvas offcanvas-start horizontal-bar"
  tabIndex="-1"
  id="offcanvasMenu"
  aria-labelledby="offcanvasMenuLabel"
  style={{ width: "350px", height: "100vh", overflow: "hidden"  }}
>
  <div className="offcanvas-header">
    <button
      type="button"
      className="btn-close btn-close-white text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>

  <div
    className="offcanvas-body text-white"
    style={{
      padding: "0.5rem",
      fontSize: "0.85rem",
      overflowY: "auto",
      maxHeight: "calc(100vh - 3rem)", // Adjust based on header
      
    }}
  >
    <ul className="list-group">
      {/* Admin Menu */}
      <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("admin")}>
        <i className="bi bi-person-gear me-2"></i>Admin
      </li>
      {openMain === "admin" && (
        <>
          <li className="list-group-item hover-lift menu-item ms-3" onClick={() => setOpenSubAdmin(!openSubAdmin)}>
            <i className="bi bi-sliders2 me-2"></i>Configuration
          </li>
          {openSubAdmin && (
            <>
              <li className="list-group-item hover-lift menu-item ms-4" onClick={() => setOpenSubMasters(!openSubMasters)}>
                <i className="bi bi-diagram-3 me-2"></i>Masters
              </li>
              {openSubMasters && (
                <ul className="list-group ms-5">
                  <li className="list-group-item hover-lift menu-item"><Link to="/leavetypes" className="text-white text-decoration-none"  onClick={handleRouteChange}>Leave Type</Link></li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/designation" className="text-white text-decoration-none"  onClick={handleRouteChange}>Designation</Link> </li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/clients" className="text-white text-decoration-none"  onClick={handleRouteChange}>Client</Link></li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/projects" className="text-white text-decoration-none"  onClick={handleRouteChange}>Project</Link></li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/goal" className="text-white text-decoration-none"  onClick={handleRouteChange}>Goals Configuration</Link></li>
                  <li className="list-group-item hover-lift menu-item">Attribute Configuration</li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/tasks" className="text-white text-decoration-none"  onClick={handleRouteChange}>Tasks</Link></li>
                  <li className="list-group-item hover-lift menu-item">Tax Setup Hub</li>
                  <li className="list-group-item hover-lift menu-item"><Link to="/relaseNote" className="text-white text-decoration-none"  onClick={handleRouteChange}>Upload Release Note</Link></li>
                </ul>
              )}
            </>
          )}
        </>
      )}

      {/* HR Menu */}
      <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("hr")}>
        <i className="bi bi-people-fill me-2"></i>HR
      </li>
      {openMain === "hr" && (
        <>
          <li className="list-group-item hover-lift menu-item ms-3" onClick={() => setOpenSubHR(!openSubHR)}>
            <i className="bi bi-tools me-2"></i>Tools
          </li>
          {openSubHR && (
            <ul className="list-group ms-5">
              <li className="list-group-item hover-lift menu-item">EMS</li>
              <li className="list-group-item hover-lift menu-item">Smart Hire</li>
              <li className="list-group-item hover-lift menu-item">Policies</li>
              <li className="list-group-item hover-lift menu-item">Holidays</li>
            </ul>
          )}
        </>
      )}

      {/* IT Menu */}
      <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("it")}>
        <i className="bi bi-cpu me-2"></i>IT
      </li>
      {openMain === "it" && (
        <>
          <li className="list-group-item hover-lift menu-item ms-3" onClick={() => setOpenSubIT(!openSubIT)}>
            <i className="bi bi-tools me-2"></i>Tools
          </li>
          {openSubIT && (
            <ul className="list-group ms-5">
              <li className="list-group-item hover-lift menu-item">Requests</li>
            </ul>
          )}
        </>
      )}

      {/* Finance Menu */}
      <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("finance")}>
        <i className="bi bi-cash-stack me-2"></i>Finance
      </li>
      {openMain === "finance" && (
        <>
          <li className="list-group-item hover-lift menu-item ms-3" onClick={() => setOpenSubFinance(!openSubFinance)}>
            <i className="bi bi-wallet2 me-2"></i>Expenses
          </li>
          {openSubFinance && (
            <ul className="list-group ms-5">
              <li className="list-group-item hover-lift menu-item">Submission</li>
              <li className="list-group-item hover-lift menu-item">Records</li>
            </ul>
          )}
        </>
      )}

      {/* Reports Menu */}
      <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("reports")}>
        <i className="bi bi-bar-chart-line me-2"></i>Reports
      </li>
      {openMain === "reports" && (
        <ul className="list-group ms-4">
          <li className="list-group-item hover-lift menu-item">Project Report</li>
          <li className="list-group-item hover-lift menu-item">Expense Report</li>
          <li className="list-group-item hover-lift menu-item">Attendance Report</li>
          <li className="list-group-item hover-lift menu-item">Attendance Compliance Report</li>
          <li className="list-group-item hover-lift menu-item">Timesheet Effort Report</li>
          <li className="list-group-item hover-lift menu-item">Timesheet Report</li>
        </ul>
      )}

      {/* Release Note */}
      <li className="list-group-item hover-lift menu-item">
        <i className="bi bi-journal-code me-2"></i>Release Note
      </li>
    </ul>
  </div>
</div>



      {/* Dashboard Content */}
      <div className="container py-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-6 mb-4">
            <div className="card text-white mb-4" style={{ background: 'linear-gradient(to right, #d63031, #6c5ce7)', height: '250px' }}>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title mb-3">Employee / Associate Details</h5>
                  <p className="card-text"><strong>Name:</strong> {user.username}</p>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                </div>
                <img
                  src={avatarImg}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="card text-center shadow-sm hover-lift">
                  <div className="card-body">
                    <h6 className="text-secondary mb-2">Active Employees</h6>
                    <h3 className="text-danger">32</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card text-center shadow-sm hover-lift">
                  <div className="card-body">
                    <h6 className="text-secondary mb-2">Inactive Employees</h6>
                    <h3 className="text-danger">5</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center shadow-sm hover-lift">
              <div className="card-body">
                <h6 className="text-secondary mb-2">Upcoming Holidays</h6>
                <p className="text-primary">Telangana Formation Day</p>
                <p className="text-muted">02 June</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-6">
            <div className="card mb-4 shadow-sm hover-lift">
              <div className="card-body">
                <h6 className="text-secondary mb-3">Candidate List</h6>
                <div className="d-flex justify-content-end">
                  <i className="bi bi-people-fill fs-3 text-secondary"></i>
                </div>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h6 className="text-secondary mb-2">Birthday List</h6>
                <p className="text-muted">No birthdays coming next week.</p>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-secondary mb-2">Company News</h6>
                <ul className="list-unstyled small text-muted mt-2">
                  <li>PranHirefy welcomes strong leadership with extensive IT experience...</li>
                  <li>Stay tuned for exciting updates as we embark on this journey together!</li>
                  <li>PranHirefy.ai launches its AI Innovation & Solutions Hub...</li>
                  <li>Let’s Build the AI-Driven Enterprise Together.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input className="form-control" value={user.username} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Old Password</label>
                    <input type="password" className="form-control" {...register('oldPassword')} />
                    <p className="text-danger small">{errors.oldPassword?.message}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" {...register('newPassword')} />
                    <p className="text-danger small">{errors.newPassword?.message}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" {...register('confirmPassword')} />
                    <p className="text-danger small">{errors.confirmPassword?.message}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMain;
