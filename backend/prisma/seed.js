import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.usuario.count();
  if (c > 0) {
    console.log(" Banco já populado.");
    return;
  }
  const [u1, u2] = await prisma.$transaction([
    prisma.usuario.create({
      data: { nome: "Admin", email: "admin@empresa.com", senha: "123456" },
    }),
    prisma.usuario.create({
      data: { nome: "Maria", email: "maria@empresa.com", senha: "123456" },
    }),
  ]);
  await prisma.material.createMany({
    data: [
      {
        nome: "Papel A4",
        categoria: "Papelaria",
        codigo: "PAP-A4",
        custo_unitario: 0.1,
        estoque_minimo: 5,
        estoque_atual: 50,
      },
      {
        nome: "Caneta Azul 0.7",
        categoria: "Escrita",
        codigo: "CAN-AZ07",
        custo_unitario: 1.9,
        estoque_minimo: 20,
        estoque_atual: 100,
      },
      {
        nome: "Toner HP 12A",
        categoria: "Impressão",
        codigo: "TON-HP12A",
        custo_unitario: 250,
        estoque_minimo: 2,
        estoque_atual: 5,
      },
    ],
  });
  await prisma.movimentacao.createMany({
    data: [
      {
        tipo: "entrada",
        quantidade: 10,
        data: "2025-10-01",
        materialId: 1,
        usuarioId: u1.id,
      },
      {
        tipo: "saida",
        quantidade: 3,
        data: "2025-10-02",
        materialId: 2,
        usuarioId: u2.id,
      },
      {
        tipo: "entrada",
        quantidade: 2,
        data: "2025-10-03",
        materialId: 3,
        usuarioId: u1.id,
      },
    ],
  });
  console.log(" Banco populado.");
}
main().finally(async () => prisma.$disconnect());
