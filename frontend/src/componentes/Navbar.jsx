import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import "./Navbar.css";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const logado = !!usuario?.id;

  function sair() {
    localStorage.removeItem("usuario");
    nav("/login");
  }

  function voltar() {
    if (logado) nav("/dashboard");
    else nav("/");
  }

  const isLogin = location.pathname === "/login";
  const isInterna =
    location.pathname === "/materiais" || location.pathname === "/estoque";

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => nav("/")}>
        Almoxarifado SENAI
      </div>

      <div className="navbar__auth">
        {isLogin ? (
          <button onClick={voltar} className="navbar__btn">
            Voltar
          </button>
        ) : !logado ? (
          <Link to="/login" className="navbar__btn">
            Entrar
          </Link>
        ) : isInterna ? (
          <button onClick={voltar} className="navbar__btn">
            Voltar
          </button>
        ) : (
          <button onClick={sair} className="navbar__btn">
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}
