const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  serial: { type: String, unique: true },
  modelo: { type: String, unique: true },
  descripcion: String,
  color: String,
  fechaCompra: Date,
  precio: Number,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca' },
  estadoEquipo: { type: mongoose.Schema.Types.ObjectId, ref: 'EstadoEquipo' },
  tipoEquipo: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoEquipo' },
});

module.exports = mongoose.model('Inventario', inventarioSchema);
