
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from './avatar.avif';


// import axios from 'axios';
// import * as yup from 'yup';
import '../MainDashboard.css';
// import { Link } from 'react-router-dom';
import NavbarSidebar from './Sidebar';
import HeaderComponent from './HeaderComponent';



const DashboardMain = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  // const [showMenu, setShowMenu] = useState(false);
  // const menuRef = useRef();


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(savedUser);
    }
  }, [navigate]);
  if (!user) return null;


  return (
    <>
    <HeaderComponent /> 
      {/* Navbar */}
      <NavbarSidebar  />



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

    
    </>
  );
};

export default DashboardMain;
