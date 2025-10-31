import "./Home.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">🏷️ Almoxarifado Interno</div>
        <button className="btn-login" onClick={() => nav("/login")}>
          Entrar
        </button>
      </nav>
      <section className="hero">
        <div className="card">
          <h1>Controle de Materiais</h1>
          <p>Gerencie compras e requisições internas com segurança.</p>
          <button className="btn-primary" onClick={() => nav("/login")}>
            Acessar Sistema
          </button>
        </div>
      </section>
      <footer className="footer">© 2025 Almoxarifado — React + Prisma</footer>
    </div>
  );
}
