import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

 app.get("/", (_req, res) => {
  res.json({ ok: true, name: "API Almoxarifado SENAI" });
});

 app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const u = await prisma.usuario.findUnique({ where: { email } });
    if (!u || u.senha !== senha) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }
    res.json({ usuario: { id: u.id, nome: u.nome, email: u.email } });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

 app.get("/api/materiais", async (req, res) => {
  const q = (req.query.q || "").toString();
  const where = q
    ? {
        OR: [
          { nome: { contains: q, mode: "insensitive" } },
          { categoria: { contains: q, mode: "insensitive" } },
          { codigo: { contains: q, mode: "insensitive" } }
        ]
      }
    : {};
  try {
    const materiais = await prisma.material.findMany({
      where,
      orderBy: { nome: "asc" }
    });
    res.json(materiais);
  } catch (err) {
    console.error("Erro ao listar materiais:", err);
    res.status(500).json({ erro: "Erro ao listar materiais" });
  }
});

 app.post("/api/materiais", async (req, res) => {
  const { nome, categoria, codigo, custo_unitario, estoque_minimo, estoque_atual } = req.body;
  if (!nome || !categoria) {
    return res.status(400).json({ erro: "Nome e categoria são obrigatórios." });
  }
  try {
    await prisma.material.create({
      data: {
        nome,
        categoria,
        codigo: codigo || null,
        custo_unitario: custo_unitario !== "" && custo_unitario !== null ? Number(custo_unitario) : null,
        estoque_minimo: Number(estoque_minimo ?? 0),
        estoque_atual: Number(estoque_atual ?? 0)
      }
    });
    res.status(201).json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao criar material:", err);
     if (err.code === "P2002") return res.status(400).json({ erro: "Código já cadastrado." });
    res.status(500).json({ erro: "Erro ao criar material" });
  }
});

 app.put("/api/materiais/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, categoria, codigo, custo_unitario, estoque_minimo, estoque_atual } = req.body;
  try {
    await prisma.material.update({
      where: { id },
      data: {
        nome,
        categoria,
        codigo: codigo || null,
        custo_unitario: custo_unitario !== "" && custo_unitario !== null ? Number(custo_unitario) : null,
        estoque_minimo: Number(estoque_minimo),
        estoque_atual: Number(estoque_atual)
      }
    });
    res.json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao editar material:", err);
    res.status(404).json({ erro: "Material não encontrado" });
  }
});

 app.delete("/api/materiais/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.material.delete({ where: { id } });
    res.json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao excluir material:", err);
    res.status(404).json({ erro: "Material não encontrado" });
  }
});

 app.post("/api/movimentos", async (req, res) => {
  const { material_id, tipo, quantidade, data, usuario_id } = req.body;
  try {
    const mat = await prisma.material.findUnique({ where: { id: Number(material_id) } });
    if (!mat) return res.status(404).json({ erro: "Material não encontrado" });

    const q = Number(quantidade);
    if (!q || q <= 0) return res.status(400).json({ erro: "Quantidade deve ser > 0" });

    let novo = mat.estoque_atual;
    if (tipo === "entrada") {
      novo += q;
    } else if (tipo === "saida") {
      if (q > mat.estoque_atual) return res.status(400).json({ erro: "Estoque insuficiente" });
      novo -= q;
    } else {
      return res.status(400).json({ erro: "Tipo inválido" });
    }

    await prisma.$transaction([
      prisma.movimentacao.create({
        data: {
          materialId: mat.id,
          usuarioId: Number(usuario_id),
          tipo,
          quantidade: q,
          data
        }
      }),
      prisma.material.update({ where: { id: mat.id }, data: { estoque_atual: novo } })
    ]);

    const alerta = novo < mat.estoque_minimo;
    res.json({ novoEstoque: novo, alerta });
  } catch (err) {
    console.error("Erro ao registrar movimentação:", err);
    res.status(500).json({ erro: "Erro ao registrar movimentação" });
  }
});

 app.get("/api/movimentos", async (_req, res) => {
  try {
    const movs = await prisma.movimentacao.findMany({
      orderBy: { id: "desc" },
      include: { material: true, usuario: true }
    });
    res.json(
      movs.map(m => ({
        id: m.id,
        material_nome: m.material.nome,
        requisitante: m.usuario.nome,
        tipo: m.tipo,
        quantidade: m.quantidade,
        data: m.data
      }))
    );
  } catch (err) {
    console.error("Erro ao listar movimentações:", err);
    res.status(500).json({ erro: "Erro ao listar movimentações" });
  }
});

 const PORT = Number(process.env.PORT || 3001);
function start(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Servidor rodando em http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Porta ${port} em uso. Tentando a próxima...`);
      start(port + 1);
    } else {
      console.error("Erro ao iniciar o servidor:", err);
    }
  });
}
start(PORT);
