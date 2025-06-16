const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  responsavel: {
    type: String,
    required: true,
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataFim: {
    type: Date,
  },
  localizacao: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  descricao: {
    type: String,
  },
  foto: {
    type: String, // pode ser URL ou base64
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Obra', ObraSchema);
