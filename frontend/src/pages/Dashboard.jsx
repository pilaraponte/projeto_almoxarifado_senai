import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import React from "react";


export default function Dashboard() {
  const nav = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  function sair() {
    localStorage.removeItem("usuario");
    nav("/");
  }
  return (
    <div className="dashboard">

      <section className="dcontent">
        <h2>Bem-vindo(a), {usuario.nome || "Usuário"}!</h2>
        <p>Controle de materiais e movimentações internas.</p>
        <div className="cards">
          <div className="card" onClick={() => nav("/materiais")}>
            <h3>Cadastro de Materiais</h3>
          </div>
          <div className="card" onClick={() => nav("/estoque")}>
            <h3>Gestão de Estoque</h3>

          </div>
        </div>
      </section>
    </div>
  );
}
