//controllers/fiscalizacaoController.js
const Fiscalizacao = require("../models/Fiscalizacao");

exports.criarFiscalizacao = async (req, res) => {
  try {
    const novaFiscalizacao = new Fiscalizacao(req.body);
    await novaFiscalizacao.save();
    res.status(201).json(novaFiscalizacao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarFiscalizacoes = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find().populate("obra");
    res.json(fiscalizacoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.obterFiscalizacaoPorId = async (req, res) => {
  try {
    const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate(
      "obra"
    );
    if (!fiscalizacao) return res.status(404).json({ erro: "Não encontrada" });
    res.json(fiscalizacao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarFiscalizacao = async (req, res) => {
  try {
    const atualizada = await Fiscalizacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletarFiscalizacao = async (req, res) => {
  try {
    await Fiscalizacao.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarPorObra = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find({ obra: req.params.id });
    res.json(fiscalizacoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
