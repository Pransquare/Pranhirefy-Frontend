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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import ViewClient from "./components/ViewClient";

import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject"; // You need to create this
import ViewProject from "./components/ViewProject"; // Optional: for viewing details
import EditProject from "./components/EditProject";

import LeaveTypeList from "./components/LeaveTypeList";
import ViewLeaveType from "./components/ViewLeaveType";
import AddLeaveTypeForm from "./components/AddLeaveTypeForm";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails"; // ✅ Import this
import EditTask from "./components/EditTask";
import AddTask from "./components/AddTask";

import MasterReleaseNotesList from "./components/MasterReleaseNoteList";
import MasterReleaseNotesForm from "./components/MasterReleaseNoteForm";
import ViewReleaseNote from "./components/ViewReleaseNote";

import ListGoals from "./components/ListGoals";

import CreateGoal from "./components/CreateGoal";
import GoalDetails from "./components/GoalDetails";
import EditGoal from "./components/EditGoal";

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
        {/* Project Type Routes */}
        {/* <Route path="/" element={<Navigate to="/projects" replace />} /> */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/view/:id" element={<ViewProject />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        {/* Tasks Routes*/}
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/view-task/:id" element={<TaskDetails />} />{" "}
        <Route path="/tasks/edit-task/:id" element={<EditTask />} />
        <Route path="/tasks/add-task" element={<AddTask />} />
        {/*Release Notes Routes */}
        <Route path="/relaseNote" element={<MasterReleaseNotesList />} />
        <Route path="/relaseNote/add" element={<MasterReleaseNotesForm />} />
        <Route
          path="/relaseNote/edit/:id"
          element={<MasterReleaseNotesForm />}
        />
        <Route path="/relaseNote/view/:id" element={<ViewReleaseNote />} />
        {/*Goals Routes */}
        <Route path="/goal" element={<ListGoals />} />
        <Route path="/goal/add-goal" element={<CreateGoal />} />
        <Route path="/goal/goal/:id" element={<GoalDetails />} />
        <Route path="/goal/edit-goal/:id" element={<EditGoal />} />
      </Routes>
    </Router>
  );
}

export default App;
