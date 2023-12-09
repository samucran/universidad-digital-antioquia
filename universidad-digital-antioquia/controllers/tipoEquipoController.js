const TipoEquipo = require('/models/TipoEquipo');

const tipoEquipoController = {
  getAll: async (req, res) => {
    try {
      const tiposEquipos = await TipoEquipo.find();
      res.render('tipoEquipo', { tiposEquipos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, estado } = req.body;
      const nuevoTipoEquipo = new TipoEquipo({ nombre, estado });
      await nuevoTipoEquipo.save();
      res.redirect('/tipo-equipo');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, estado } = req.body;
      await TipoEquipo.findByIdAndUpdate(id, { nombre, estado, fechaActualizacion: Date.now() });
      res.redirect('/tipo-equipo');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = tipoEquipoController;
