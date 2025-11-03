import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Materiais from "./pages/Materiais.jsx";
import Estoque from "./pages/Estoque.jsx";
import Home from "./pages/Home.jsx";
import React from "react";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ marginTop: hideNavbar ? 0 : "80px" }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </div>
    </>
  );
}
