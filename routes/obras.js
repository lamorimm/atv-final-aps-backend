//routes/obra.js
const express = require("express");
const router = express.Router();
const obraController = require("../controllers/obraController.js");
const fiscalizacaoController = require("../controllers/fiscalizacaoController.js");
const emailService = require("../services/emailService");

// Rotas CRUD de obras
router.post("/", obraController.criarObra);
router.get("/", obraController.listarObras);
router.get("/:id", obraController.obterObraPorId);
router.put("/:id", obraController.atualizarObra);
router.delete("/:id", obraController.deletarObra);

// Rotas relacionadas a fiscalizações
router.get("/:id/fiscalizacoes", fiscalizacaoController.listarPorObra);

router.post(
  "/:id/enviar-fiscalizacoes",
  fiscalizacaoController.enviarFiscalizacoesPorEmail
);

module.exports = router;
