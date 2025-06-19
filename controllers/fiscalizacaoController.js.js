const Fiscalizacao = require("../models/Fiscalizacao");
const mongoose = require("mongoose");
const Obra = require("../models/Obra");
const emailService = require("../services/emailService");

exports.criarFiscalizacao = async (req, res) => {
  try {
    const novaFiscalizacao = new Fiscalizacao(req.body);
    await novaFiscalizacao.save();
    res.status(201).json(novaFiscalizacao);
  } catch (err) {
    res.status(400).json({
      erro: "Erro ao criar fiscalização",
      detalhes: err.message,
    });
  }
};

exports.listarFiscalizacoes = async (req, res) => {
  try {
    const fiscalizacoes = await Fiscalizacao.find()
      .populate("obra", "nome responsavel localizacao")
      .lean();
    res.json(fiscalizacoes);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao listar fiscalizações",
      detalhes: err.message,
    });
  }
};

exports.obterFiscalizacaoPorId = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const fiscalizacao = await Fiscalizacao.findById(req.params.id).populate(
      "obra",
      "nome responsavel localizacao"
    );

    if (!fiscalizacao) {
      return res.status(404).json({ erro: "Fiscalização não encontrada" });
    }

    res.json(fiscalizacao);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao obter fiscalização",
      detalhes: err.message,
    });
  }
};

exports.atualizarFiscalizacao = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const atualizada = await Fiscalizacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("obra");

    if (!atualizada) {
      return res.status(404).json({ erro: "Fiscalização não encontrada" });
    }

    res.json(atualizada);
  } catch (err) {
    res.status(400).json({
      erro: "Erro ao atualizar fiscalização",
      detalhes: err.message,
    });
  }
};

exports.deletarFiscalizacao = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const deletada = await Fiscalizacao.findByIdAndDelete(req.params.id);

    if (!deletada) {
      return res.status(404).json({ erro: "Fiscalização não encontrada" });
    }

    res.json({
      mensagem: "Fiscalização deletada com sucesso",
      id: req.params.id,
    });
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao deletar fiscalização",
      detalhes: err.message,
    });
  }
};

exports.listarPorObra = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ erro: "ID de obra inválido" });
    }

    const fiscalizacoes = await Fiscalizacao.find({
      obra: req.params.id,
    }).populate("obra", "nome responsavel");

    res.json({
      success: true,
      count: fiscalizacoes.length,
      data: fiscalizacoes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      erro: "Erro ao buscar fiscalizações por obra",
      detalhes: err.message,
    });
  }
};


exports.enviarFiscalizacoesPorEmail = async (req, res) => {
  try {
    const { id } = req.params; // Este é o ID da obra
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ erro: "Email de destino é obrigatório" });
    }

    const obra = await Obra.findById(id);
    if (!obra) {
      return res.status(404).json({ erro: "Obra não encontrada" });
    }

    const fiscalizacoes = await Fiscalizacao.find({ obra: id });

    // Adicionando o id como quarto parâmetro
    const resultado = await emailService.enviarEmailComFiscalizacoes(
      email,
      fiscalizacoes,
      { nome: obra.nome, responsavel: obra.responsavel },
      id // Passando o ID da obra
    );

    if (!resultado.success) {
      return res.status(500).json({ 
        erro: "Erro ao enviar email",
        detalhes: resultado.error 
      });
    }

    res.json({ 
      success: true,
      message: `Relatório enviado para ${email}`,
      fiscalizacoesEnviadas: fiscalizacoes.length,
      obraId: id // Retornando o ID no response também
    });
  } catch (err) {
    res.status(500).json({ 
      erro: "Erro no servidor",
      detalhes: err.message 
    });
  }
};
