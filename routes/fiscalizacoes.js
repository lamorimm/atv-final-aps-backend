const express = require("express");
const router = express.Router();
const fiscalizacaoController = require("../controllers/fiscalizacaoController.js");


// CRUD
router.get("/obras/:id/fiscalizacoes", fiscalizacaoController.listarPorObra);
router.post("/", fiscalizacaoController.criarFiscalizacao);
router.get("/", fiscalizacaoController.listarFiscalizacoes);
router.get("/:id", fiscalizacaoController.obterFiscalizacaoPorId);
router.put("/:id", fiscalizacaoController.atualizarFiscalizacao);
router.delete("/:id", fiscalizacaoController.deletarFiscalizacao);

module.exports = router;
