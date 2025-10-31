INSERT INTO usuarios (nome,email,senha) VALUES ('Admin','admin@empresa.com','123456'),('Maria','maria@empresa.com','123456'),('João','joao@empresa.com','123456');
INSERT INTO materiais (nome,categoria,codigo,custo_unitario,estoque_minimo,estoque_atual) VALUES
('Papel A4','Papelaria','PAP-A4',0.10,5,50),
('Caneta Azul 0.7','Escrita','CAN-AZ07',1.90,20,100),
('Toner HP 12A','Impressão','TON-HP12A',250.00,2,5);
INSERT INTO movimentacoes (tipo,quantidade,data,material_id,usuario_id) VALUES
('entrada',10,'2025-10-01',1,1),
('saida',3,'2025-10-02',2,2),
('entrada',2,'2025-10-03',3,1);