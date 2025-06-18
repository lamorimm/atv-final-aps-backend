// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("🔴 Erro ao conectar MongoDB:", err));

// Rotas da API
const obraRoutes = require("./routes/obras");
app.use("/obras", obraRoutes);

const fiscalizacaoRoutes = require("./routes/fiscalizacoes");
app.use("/fiscalizacoes", fiscalizacaoRoutes);


// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);

});
