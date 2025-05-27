

import React, { useState,useRef,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const NavbarSidebar = () => {
  const [openMain, setOpenMain] = useState(null);
  const [openSubAdmin, setOpenSubAdmin] = useState(false);
  const [openSubMasters, setOpenSubMasters] = useState(false);
  const [openSubHR, setOpenSubHR] = useState(false);
  const [openSubIT, setOpenSubIT] = useState(false);
  const [openSubFinance, setOpenSubFinance] = useState(false);
  
   const [openSub, setOpenSub] = useState({});


   const menuRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
   const [user, setUser] = useState(null);


     useEffect(() => {
       const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
       if (!savedUser) {
         navigate('/login');
       } else {
         setUser(savedUser);
       }
     }, [navigate]);
      useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



const userRole = user?.roleType?.toLowerCase(); // <-- normalize

   const schema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().min(6, 'New password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  

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
    // await axios.put(`http://localhost:8080/api/login-users/${encodeURIComponent(userId)}`, updatedUser);
    await axios.put(`http://localhost:8080/api/login-users/update/${encodeURIComponent(userId)}`, updatedUser);


    alert('Password changed successfully!');
    handleCloseModal();
  } catch (error) {
    console.error('Error changing password:', error);
    alert('Failed to change password');
  }
};

  if (!user) return null;
  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  };

const roleMenus = {
  admin: ["admin", "hr", "it", "finance", "reports", "releaseNote"],
  hr: ["hr", "reports", "releaseNote"],
employee: ["hrTools", "finance","reportExpense", "releaseNote"], // updated here
  manager: ["finance", "releaseNote"],
  finance: ["finance","reports", "releaseNote"],
};


  // Helper to check if current user role has access to a main menu key
  const hasAccess = (menuKey) => {
    if (!user || !user.roleType) return false;
    // Lowercase roleType to match keys (adjust if your roleType case differs)
    const role = user.roleType.toLowerCase();
    const accessibleMenus = roleMenus[role];
    return accessibleMenus ? accessibleMenus.includes(menuKey) : false;
  };

//  const toggleMainMenu = (menu) => {
//   if (openMain === menu) {
//     // Close the current main menu and all submenus
//     setOpenMain(null);
//     setOpenSubAdmin(false);
//     // setOpenSubMasters(false);
//     setOpenSubHR(false);
//     setOpenSubIT(false);
//     setOpenSubFinance(false);
//   } else {
//     // Open selected main menu, reset all submenus first
//     setOpenMain(menu);
//     setOpenSubAdmin(menu === "admin");       // open admin submenu if admin menu opened
//     setOpenSubMasters(false);                // reset deeper submenu
//     setOpenSubHR(menu === "hr");
//     setOpenSubIT(menu === "it");
//     setOpenSubFinance(menu === "finance");
//     setOpenSubMasters(false);
//   }
// };

  //  const toggleSubMenu = (submenu) => {
  //   setOpenSub((prev) => {
  //     // If clicked submenu is already open, close it
  //     if (prev[submenu]) {
  //       return {};
  //     }
  //     // Otherwise, open only the clicked submenu, closing all others
  //     return { [submenu]: true };
  //   });
  // };

const toggleSubMenu = (submenu) => {
  if (submenu === "ems" || submenu === "smartHire") {
    // Toggle toolsSub: open clicked submenu, or null if already open
    setOpenSub(prev => ({
      ...prev,
      toolsSub: prev.toolsSub === submenu ? null : submenu,
    }));
  } else {
    // For other submenus like tools/configuration/details
    setOpenSub(prev => ({
      ...prev,
      [submenu]: !prev[submenu],
    }));
  }
};



  const toggleMainMenu = (menu) => {
    setOpenMain((prev) => (prev === menu ? null : menu));
    setOpenSub({}); // Close all submenus when switching main menu
  };

 

const toggleSubAdmin = () => {
  // If Configuration closes, also close Masters
  if (openSubAdmin) {
    setOpenSubMasters(false);
  }
  setOpenSubAdmin(!openSubAdmin);
};

const toggleSubMasters = () => {
  setOpenSubMasters(!openSubMasters);
};


  const handleRouteChange = () => {
    // Close the offcanvas sidebar on route change if you want
    // You might want to do: bootstrap's offcanvas hide via JS or manually close here
  };
   const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
       console.log('Change Password clicked');
  };

  const handleChangePassword = () => {
    setShowModal(true);
       console.log('Change Password clicked');
  };
  const submenuParentMap = {
  tools: "hr",
  ems: "tools",
  smartHire: "tools",
  configuration: "hr",
  details: "hr",
};

 
const isEmployee = user.roleType.toLowerCase() === "employee";

  return (
    <>
      {/* Navbar - simple placeholder, customize as needed */}
       {/* Navbar */}
      <nav className="navbar navbar-expand-lg horizontal-menu px-3 shadow-sm" style={{height:"50px"}}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-light btn-sm me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <i className="bi bi-list fs-5 hamburger-menu"></i>
          </button>
          <span className="navbar-brand mb-0 h5">PranHirefy</span>
        </div>
        


    <div className="position-relative d-flex align-items-center justify-content-end" ref={menuRef}>
  <button
    className="btn btn-outline-primary  p-2"
    onClick={() => setShowMenu(prev => !prev)}
    aria-label="User menu"
     style={{ background: "transparent", border: "none", cursor: "pointer" }}
  >
    <i className="bi bi-person-circle fs-4"></i>
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

{/* sidebar */}
{/* Sidebar Offcanvas */}
<div
  className="offcanvas offcanvas-start horizontal-bar"
  tabIndex="-1"
  id="offcanvasMenu"
  aria-labelledby="offcanvasMenuLabel"
  style={{ width: "350px", height: "100vh", overflow: "hidden" }}
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
      maxHeight: "calc(100vh - 3rem)",
    }}
  >
    <ul className="list-group">
       {/* Admin Menu */}
      {hasAccess("admin") && (
  <>
    {/* Admin */}
    <li
      className="list-group-item hover-lift menu-item"
      onClick={() => toggleMainMenu("admin")}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-person-gear me-2"></i>Admin
    </li>

    {/* If Admin is open */}
    {openMain === "admin" && (
      <>
        {/* Configuration */}
        <li
          className="list-group-item hover-lift menu-item ms-3"
          onClick={toggleSubAdmin}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-sliders2 me-2"></i>Configuration
        </li>

        {/* If Configuration is open */}
        {openSubAdmin && (
          <>
            {/* Masters */}
            <li
              className="list-group-item hover-lift menu-item ms-4"
              onClick={toggleSubMasters}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-diagram-3 me-2"></i>Masters
            </li>

            {/* If Masters is open */}
            {openSubMasters && (
              <ul className="list-group ms-5">
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/leavetypes"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Leave Type
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/designation"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Designation
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/clients"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Client
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/projects"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Project
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/goal"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Goals Configuration
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  Attribute Configuration
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/tasks"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Tasks
                  </Link>
                </li>
                <li className="list-group-item hover-lift menu-item">
                  Tax Setup Hub
                </li>
                <li className="list-group-item hover-lift menu-item">
                  <Link
                    to="/relaseNote"
                    className="text-white text-decoration-none"
                    onClick={handleRouteChange}
                  >
                    Upload Release Note
                  </Link>
                </li>
              </ul>
            )}
          </>
        )}
      </>
    )}
  </>
)}
{/* HR Menu */}
{/* HR Sidebar - For HR Role */}
{hasAccess("hr") && (
  <>
    <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("hr")}>
      <i className="bi bi-people-fill me-2"></i>HR
    </li>
    {openMain === "hr" && (
      <>
        <li className="list-group-item hover-lift menu-item ms-3" onClick={() => toggleSubMenu("tools")}>
          <i className="bi bi-tools me-2"></i>Tools
        </li>
        {openSub.tools && (
  <>
    <li className="list-group-item hover-lift menu-item ms-4" onClick={() => toggleSubMenu("ems")}>
      <i className="bi bi-kanban me-2"></i>EMS
    </li>
    {openSub.toolsSub === "ems" && (
      <ul className="list-group ms-5">
        <li className="list-group-item hover-lift menu-item">Leave</li>
        <li className="list-group-item hover-lift menu-item">Timesheet</li>
        <li className="list-group-item hover-lift menu-item">Payroll</li>
        <li className="list-group-item hover-lift menu-item">Tax Details Management</li>
      </ul>
    )}

    <li className="list-group-item hover-lift menu-item ms-4" onClick={() => toggleSubMenu("smartHire")}>
      <i className="bi bi-person-lines-fill me-2"></i>Smart Hire
    </li>
    {openSub.toolsSub === "smartHire" && (
      <ul className="list-group ms-5">
        <li className="list-group-item hover-lift menu-item">Candidate</li>
        <li className="list-group-item hover-lift menu-item">Candidate List</li>
      </ul>
    )}

    <li className="list-group-item hover-lift menu-item ms-4">Policies</li>
    <li className="list-group-item hover-lift menu-item ms-4">Holidays</li>
  </>
)}


        <li className="list-group-item hover-lift menu-item ms-3" onClick={() => toggleSubMenu("configuration")}>
          <i className="bi bi-sliders me-2"></i>Configuration
        </li>
        {openSub.configuration && (
          <ul className="list-group ms-5">
            <li className="list-group-item hover-lift menu-item">Employee Project</li>
            <li className="list-group-item hover-lift menu-item">Employee Approvals</li>
            <li className="list-group-item hover-lift menu-item">Groups & Sub Groups</li>
          </ul>
        )}

        <li className="list-group-item hover-lift menu-item ms-3" onClick={() => toggleSubMenu("details")}>
          <i className="bi bi-file-person me-2"></i>Details
        </li>
        {openSub.details && (
          <ul className="list-group ms-5">
            <li className="list-group-item hover-lift menu-item">Employee Details</li>
          </ul>
        )}
      </>
    )}
  </>
)}

{/* Employee Sidebar - Limited HR → Tools only */}
{hasAccess("hrTools") && (
  <>
    <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("hr")}>
      <i className="bi bi-people-fill me-2"></i>HR
    </li>
    {openMain === "hr" && (
      <>
        <li className="list-group-item hover-lift menu-item ms-3" onClick={() => toggleSubMenu("tools")}>
          <i className="bi bi-tools me-2"></i>Tools
        </li>
        {openSub.tools && (
  <>
    {/* EMS */}
    <li className="list-group-item hover-lift menu-item ms-4" onClick={() => toggleSubMenu("ems")}>
      <i className="bi bi-kanban me-2"></i>EMS
    </li>
    {openSub.toolsSub === "ems" && (
      <ul className="list-group ms-5">
        <li className="list-group-item hover-lift menu-item">Leave</li>
        <li className="list-group-item hover-lift menu-item">Timesheet</li>
        <li className="list-group-item hover-lift menu-item">Payroll</li>
        <li className="list-group-item hover-lift menu-item">Tax Details Management</li>
      </ul>
    )}

    {/* Smart Hire */}
    <li className="list-group-item hover-lift menu-item ms-4" onClick={() => toggleSubMenu("smartHire")}>
      <i className="bi bi-person-lines-fill me-2"></i>Smart Hire
    </li>
    {openSub.toolsSub === "smartHire" && (
      <ul className="list-group ms-5">
        <li className="list-group-item hover-lift menu-item">Candidate</li>
        <li className="list-group-item hover-lift menu-item">Candidate List</li>
      </ul>
    )}

    {/* Other Items */}
    <li className="list-group-item hover-lift menu-item ms-4">Policies</li>
    <li className="list-group-item hover-lift menu-item ms-4">Holidays</li>
  </>
)}

      </>
    )}
  </>
)}


      {/* IT Menu */}
      {hasAccess("it") && (
        <>
          <li
            className="list-group-item hover-lift menu-item"
            onClick={() => toggleMainMenu("it")}
          >
            <i className="bi bi-cpu me-2"></i>IT
          </li>
          {openMain === "it" && (
            <>
              <li
                className="list-group-item hover-lift menu-item ms-3"
                onClick={() => setOpenSubIT(!openSubIT)}
              >
                <i className="bi bi-tools me-2"></i>Tools
              </li>
              {openSubIT && (
                <ul className="list-group ms-5">
                  <li className="list-group-item hover-lift menu-item">Requests</li>
                </ul>
              )}
            </>
          )}
        </>
      )}

      {/* Finance Menu */}
     {hasAccess("finance") && (
  <>
    {/* Finance Main Menu */}
    <li
      className="list-group-item hover-lift menu-item"
      onClick={() => toggleMainMenu("finance")}
    >
      <i className="bi bi-cash-stack me-2"></i>Finance
    </li>

    {/* Show if Finance is selected */}
    {openMain === "finance" && (
      <>
        {/* Expenses Submenu */}
        <li
          className="list-group-item hover-lift menu-item ms-3"
          onClick={() => toggleSubMenu("expenses")}
        >
          <i className="bi bi-wallet2 me-2"></i>Expenses
        </li>

        {/* Submission & Records under Expenses */}
        {openSub["expenses"] && (
          <ul className="list-group ms-5">
            <li className="list-group-item hover-lift menu-item">Submission</li>
            <li className="list-group-item hover-lift menu-item">Records</li>
          </ul>
        )}
      </>
    )}

    
{hasAccess("reportExpense") && (
  <>
    <li className="list-group-item hover-lift menu-item" onClick={() => toggleMainMenu("reportExpense")}>
      <i className="bi bi-bar-chart-fill me-2"></i>Reports
    </li>
    {openMain === "reportExpense" && (
      <ul className="list-group ms-4">
        <li className="list-group-item hover-lift menu-item">Expense Report</li>
      </ul>
    )}
  </>
)}

    {/* Reports Main Menu */}
    
  </>
)}





      {/* Reports Menu */}
      {hasAccess("reports") && (
  <>
    <li
      className="list-group-item hover-lift menu-item"
      onClick={() => toggleMainMenu("reports")}
    >
      <i className="bi bi-bar-chart-line me-2"></i>Reports
    </li>

    {openMain === "reports" && (
      <ul className="list-group ms-4">
        {/* HR-only and Finance-only Reports */}
        {userRole === "hr" && (
          <>
            <li className="list-group-item hover-lift menu-item">Project Report</li>
            <li className="list-group-item hover-lift menu-item">Attendance Compliance Report</li>
            <li className="list-group-item hover-lift menu-item">Timesheet Effort Report</li>
            <li className="list-group-item hover-lift menu-item">Timesheet Report</li>
          </>
        )}

        {userRole === "finance" && (
          <>
            <li className="list-group-item hover-lift menu-item">Project Report</li>
            <li className="list-group-item hover-lift menu-item">Expense Report</li>
            <li className="list-group-item hover-lift menu-item">Attendance Compliance Report</li>
            <li className="list-group-item hover-lift menu-item">Timesheet Effort Report</li>
          </>
        )}
      </ul>
    )}
  </>
)}





      {/* Release Note */}
      {hasAccess("releaseNote") && (
        <li className="list-group-item hover-lift menu-item">
          <i className="bi bi-journal-code me-2"></i>Release Note
        </li>
      )}

     
      
    </ul>
  </div>
</div>



    </>
  );
};

export default NavbarSidebar;
