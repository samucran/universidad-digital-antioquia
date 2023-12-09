const Inventario = require('/models/Inventario');
const Usuario = require('/models/Usuario');
const Marca = require('/models/Marca');
const EstadoEquipo = require('/models/EstadoEquipo');
const TipoEquipo = require('/models/TipoEquipo');

const inventarioController = {
  getAll: async (req, res) => {
    try {
      const inventario = await Inventario.find()
        .populate('usuario marca estadoEquipo tipoEquipo')
        .exec();

      res.render('inventario', { inventario });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: async (req, res) => {
    try {
      // obtener datos del cuerpo de la solicitud
      const {
        serial,
        modelo,
        descripcion,
        color,
        fechaCompra,
        precio,
        usuarioId,
        marcaId,
        estadoEquipoId,
        tipoEquipoId,
      } = req.body;

      // verificar si los id son validos
      const usuario = await Usuario.findById(usuarioId);
      const marca = await Marca.findById(marcaId);
      const estadoEquipo = await EstadoEquipo.findById(estadoEquipoId);
      const tipoEquipo = await TipoEquipo.findById(tipoEquipoId);

      if (!usuario || !marca || !estadoEquipo || !tipoEquipo) {
        return res.status(400).send('IDs de usuario, marca, estadoEquipo o tipoEquipo no válidos.');
      }

      // crear un nuevo objeto inventario con los datos proporcionados
      const nuevoEquipo = new Inventario({
        serial,
        modelo,
        descripcion,
        color,
        fechaCompra,
        precio,
        usuario,
        marca,
        estadoEquipo,
        tipoEquipo,
      });

      // guardar el nuevo equipo en la base de datos
      await nuevoEquipo.save();

      // redirigir a la pagina de inventario
      res.redirect('/inventario');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

};

module.exports = inventarioController;
