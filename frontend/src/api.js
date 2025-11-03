const API = "http://localhost:3001/api";

export const api = {
  async login(email, senha) {
    try {
      const r = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      if (!r.ok) throw new Error(`Erro ${r.status} ao fazer login`);
      return r.json();
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      return { erro: "Erro de conexão com o servidor." };
    }
  },

async materiais(q = "") {
  try {
    const url = q
      ? `${API}/materiais?q=${encodeURIComponent(q)}`
      : `${API}/materiais`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Erro ${r.status} ao buscar materiais`);
    const data = await r.json();
    console.log("Materiais carregados:", data);
    return data;
  } catch (err) {
    console.error("Erro ao carregar materiais:", err);
    return [];
  }
},
  async criarMaterial(d) {
    try {
      const r = await fetch(`${API}/materiais`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error(`Erro ${r.status} ao criar material`);
      return r.json();
    } catch (err) {
      console.error("Erro ao criar material:", err);
      return null;
    }
  },

  async editarMaterial(id, d) {
    try {
      const r = await fetch(`${API}/materiais/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error(`Erro ${r.status} ao editar material`);
      return r.json();
    } catch (err) {
      console.error("Erro ao editar material:", err);
      return null;
    }
  },

  async excluirMaterial(id) {
  try {
    const r = await fetch(`${API}/materiais/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error(`Erro ${r.status} ao excluir material`);
    const data = await r.json();
    console.log("🗑️ Material excluído:", data);
    return data;
  } catch (err) {
    console.error("Erro ao excluir material:", err);
    return null;
  }
},

  async movimentos() {
    try {
      const r = await fetch(`${API}/movimentos`);
      if (!r.ok) throw new Error(`Erro ${r.status} ao buscar movimentos`);
      return r.json();
    } catch (err) {
      console.error("Erro ao buscar movimentos:", err);
      return [];
    }
  },

  async movimentar(d) {
    try {
      const r = await fetch(`${API}/movimentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error(`Erro ${r.status} ao movimentar material`);
      return r.json();
    } catch (err) {
      console.error("Erro ao movimentar:", err);
      return null;
    }
  },
};
