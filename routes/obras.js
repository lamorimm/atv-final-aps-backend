// routes /obras.js
const express = require("express");
const router = express.Router();
const obraController = require("../controllers/obraController.js");

router.post("/", obraController.criarObra);
router.get("/", obraController.listarObras);
router.get("/:id", obraController.obterObraPorId);
router.put("/:id", obraController.atualizarObra);
router.delete("/:id", obraController.deletarObra);



module.exports = router;
