// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ClientList from "./components/ClientList";
// import ClientForm from "./components/ClientForm";
// import ViewClient from "./components/ViewClient";
// import LeaveTypeList from './components/LeaveTypeList';
// import ViewLeaveType from './components/ViewLeaveType';
// import AddLeaveTypeForm from './components/AddLeaveTypeForm';
// function App() {
//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<ClientList />} />
//     //     <Route path="/add" element={<ClientForm />} />
//     //     <Route path="/edit/:id" element={<ClientForm />} />
//     //     <Route path="/view/:id" element={<ViewClient />} />
//     //   </Routes>
//     // </Router>
//     <Router>
//     <Routes>
//       <Route path="/" element={<LeaveTypeList />} />
//       <Route path="/view/:id" element={<ViewLeaveType />} />
//       <Route path="/add" element={<AddLeaveTypeForm />} />
//       <Route path="/edit/:id" element={<AddLeaveTypeForm/>} />
    
//     </Routes>
//   </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import ViewClient from "./components/ViewClient";
import LeaveTypeList from './components/LeaveTypeList';
import ViewLeaveType from './components/ViewLeaveType';
import AddLeaveTypeForm from './components/AddLeaveTypeForm';
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails"; // ✅ Import this
import EditTask from "./components/EditTask";
import AddTask from "./components/AddTask";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page with navigation buttons */}
        <Route path="/" element={<HomePage />} />

        {/* Client Routes */}
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/add" element={<ClientForm />} />
        <Route path="/clients/edit/:id" element={<ClientForm />} />
        <Route path="/clients/view/:id" element={<ViewClient />} />

        {/* Leave Type Routes */}
        <Route path="/leavetypes" element={<LeaveTypeList />} />
        <Route path="/leavetypes/add" element={<AddLeaveTypeForm />} />
        <Route path="/leavetypes/edit/:id" element={<AddLeaveTypeForm />} />
        <Route path="/leavetypes/view/:id" element={<ViewLeaveType />} />
        {/* Tasks Routes*/}
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/view-task/:id" element={<TaskDetails />} /> {/* ✅ View page */}
        <Route path="/tasks/edit-task/:id" element={<EditTask />} />
        <Route path="/tasks/add-task" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
