const Usuario = require('/models/Usuario');
const bcrypt = require('bcrypt');

const authService = {
    authenticateUser: async ({ email, contrasena }) => {
      try {
        //buscar el usuario por su direccion de correo
        const usuario = await Usuario.findOne({ email });
  
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
  
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  
        if (!contrasenaValida) {
          throw new Error('Contraseña incorrecta');
        }
  
        return usuario;
      } catch (error) {
        throw new Error('Autenticación fallida');
        }
    }
}

const usuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.render('usuario', { usuarios });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, email, contrasena, rol, estado } = req.body;
      const nuevoUsuario = new Usuario({ nombre, email, contrasena, rol, estado });
      await nuevoUsuario.save();
      res.redirect('/usuario');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, contrasena, rol, estado } = req.body;

      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }

      usuario.nombre = nombre;
      usuario.email = email;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = estado;
      usuario.fechaActualizacion = Date.now();

      await usuario.save();
      res.redirect('/usuario');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = usuarioController;
