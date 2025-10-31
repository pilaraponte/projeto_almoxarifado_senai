import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Materiais from "./pages/Materiais";
import Estoque from "./pages/Estoque";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/materiais" element={<Materiais />} />
      <Route path="/estoque" element={<Estoque />} />
    </Routes>
  );
}
