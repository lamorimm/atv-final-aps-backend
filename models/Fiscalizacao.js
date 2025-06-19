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
      enum: ["Planejada", "Em andamento", "Concluída", "Cancelada"],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Fiscalizacao", FiscalizacaoSchema);
