//models/Fiscalizacao.js
const mongoose = require("mongoose");

const FiscalizacaoSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    observacoes: {
      type: String,
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
    foto: {
      type: String, 
    },
    obra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Obra",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fiscalizacao", FiscalizacaoSchema);
