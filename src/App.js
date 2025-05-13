import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import ViewClient from "./components/ViewClient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientList />} />
        <Route path="/add" element={<ClientForm />} />
        <Route path="/edit/:id" element={<ClientForm />} />
        <Route path="/view/:id" element={<ViewClient />} />
      </Routes>
    </Router>
  );
}

export default App;
