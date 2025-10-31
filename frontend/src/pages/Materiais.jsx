import { useEffect, useState } from "react";
import React from "react";

import { api } from "../api";
import "./Home.css";
export default function Materiais() {
  const [lista, setLista] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    codigo: "",
    custo_unitario: "",
    estoque_minimo: 0,
    estoque_atual: 0,
  });
  const [edit, setEdit] = useState(null);
  async function carregar() {
    setLista(await api.materiais());
  }
  useEffect(() => {
    carregar();
  }, []);
  async function buscar() {
    setLista(await api.materiais(q));
  }
  async function salvar() {
    if (!form.nome || !form.categoria)
      return alert("Preencha nome e categoria");
    if (edit) await api.editarMaterial(edit.id, form);
    else await api.criarMaterial(form);
    setForm({
      nome: "",
      categoria: "",
      codigo: "",
      custo_unitario: "",
      estoque_minimo: 0,
      estoque_atual: 0,
    });
    setEdit(null);
    await carregar();
  }
  async function excluir(id) {
    if (!confirm("Excluir este material?")) return;
    await api.excluirMaterial(id);
    await carregar();
  }
  return (
    <div style={{ padding: "100px 20px" }}>
      <h2>Cadastro de Materiais</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Buscar..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn-primary" onClick={buscar}>
          Buscar
        </button>
      </div>
      <table
        border="1"
        cellPadding="6"
        cellSpacing="0"
        style={{ width: "100%", margin: "12px 0" }}
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Código</th>
            <th>Custo</th>
            <th>Mínimo</th>
            <th>Atual</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((m) => (
            <tr key={m.id}>
              <td>{m.nome}</td>
              <td>{m.categoria}</td>
              <td>{m.codigo || "-"}</td>
              <td>{m.custo_unitario ?? "-"}</td>
              <td>{m.estoque_minimo}</td>
              <td>{m.estoque_atual}</td>
              <td>
                <button
                  onClick={() => {
                    setEdit(m);
                    setForm(m);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluir(m.id)} style={{ marginLeft: 6 }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{edit ? "Editar" : "Novo"} material</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 8,
        }}
      >
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="Categoria"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />
        <input
          placeholder="Código"
          value={form.codigo || ""}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
        />
        <input
          type="number"
          placeholder="Custo unitário"
          value={form.custo_unitario || ""}
          onChange={(e) => setForm({ ...form, custo_unitario: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque mínimo"
          value={form.estoque_minimo}
          onChange={(e) =>
            setForm({ ...form, estoque_minimo: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Estoque atual"
          value={form.estoque_atual}
          onChange={(e) =>
            setForm({ ...form, estoque_atual: Number(e.target.value) })
          }
        />
      </div>
      <button
        className="btn-primary"
        style={{ marginTop: 10 }}
        onClick={salvar}
      >
        {edit ? "Salvar alterações" : "Criar material"}
      </button>
    </div>
  );
}
