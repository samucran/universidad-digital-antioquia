const mongoose = require('mongoose');

const estadoEquipoSchema = new mongoose.Schema({
  nombre: String,
  estado: { type: String, enum: ['Activo', 'Inactivo'] },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EstadoEquipo', estadoEquipoSchema);
