const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contrasena: String,
  rol: { type: String, enum: ['administrador', 'docente'], default: 'docente' },
  estado: { type: String, enum: ['Activo', 'Inactivo'] },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

// metodo para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  const usuario = this;

  // solo encripta la contraseña si es nueva o ha sido modificada
  if (!usuario.isModified('contrasena')) return next();

  try {
    const hashedContrasena = await bcrypt.hash(usuario.contrasena, 10);
    usuario.contrasena = hashedContrasena;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
