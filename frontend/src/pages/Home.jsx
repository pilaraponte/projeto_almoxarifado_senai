import "./Home.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home-container">

      <section className="hero">
        <div className="card">
          <h1>Controle de Materiais</h1>
          <p>Gerencie compras e requisições internas com segurança.</p>
          <button className="btn-primary" onClick={() => nav("/login")}>
            Acessar Sistema
          </button>
        </div>
      </section>
      <footer className="footer">© 2025 Almoxarifado SENAI </footer>
    </div>
  );
}
