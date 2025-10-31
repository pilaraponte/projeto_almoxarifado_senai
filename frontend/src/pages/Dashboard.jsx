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
      <header className="dh">
        <h1>📦 Painel do Almoxarifado</h1>
        <button className="sair" onClick={sair}>
          Sair
        </button>
      </header>
      <section className="dcontent">
        <h2>Bem-vindo, {usuario.nome || "Usuário"}!</h2>
        <p>Controle de materiais e movimentações internas.</p>
        <div className="cards">
          <div className="card" onClick={() => nav("/materiais")}>
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
              alt="Materiais"
            />
            <h3>Cadastro de Materiais</h3>
            <p>Gerencie itens (CRUD + busca).</p>
          </div>
          <div className="card" onClick={() => nav("/estoque")}>
            <img
              src="https://images.unsplash.com/photo-1580147369301-1cf3f1a9b8b6"
              alt="Estoque"
            />
            <h3>Gestão de Estoque</h3>
            <p>Entradas, saídas, alertas e histórico.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
