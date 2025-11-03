import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import React from "react";
import Navbar from "../componentes/Navbar";

import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const nav = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    const r = await api.login(email, senha);
    if (r.erro) setErro(r.erro);
    else {
      localStorage.setItem("usuario", JSON.stringify(r.usuario));
      nav("/dashboard");
    }
  }

  return (
    <>
      <Navbar /> {/* 🔹 Mostra o menu azul SENAI também no login */}
      <div className="login-wrap">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={entrar}>
            <input
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className="login-btn">Entrar</button>
          </form>
          {erro && <p className="login-err">{erro}</p>}
        </div>
      </div>
    </>
  );
}
