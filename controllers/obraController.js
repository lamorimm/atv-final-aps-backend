const Obra = require('../models/Obra.js');

// Criar uma nova obra
exports.criarObra = async (req, res) => {
  try {
    const novaObra = new Obra(req.body);
    const obraSalva = await novaObra.save();
    res.status(201).json(obraSalva);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Listar todas as obras
exports.listarObras = async (req, res) => {
  try {
    const obras = await Obra.find();
    res.json(obras);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Obter uma obra por ID
exports.obterObraPorId = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ erro: 'Obra não encontrada' });
    res.json(obra);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar uma obra
exports.atualizarObra = async (req, res) => {
  try {
    const obraAtualizada = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!obraAtualizada) return res.status(404).json({ erro: 'Obra não encontrada' });
    res.json(obraAtualizada);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

// Deletar uma obra
exports.deletarObra = async (req, res) => {
  try {
    const obraDeletada = await Obra.findByIdAndDelete(req.params.id);
    if (!obraDeletada) return res.status(404).json({ erro: 'Obra não encontrada' });
    res.json({ mensagem: 'Obra deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
