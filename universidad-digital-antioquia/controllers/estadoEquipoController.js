const EstadoEquipo = require('/models/EstadoEquipo');

const estadoEquipoController = {
  getAll: async (req, res) => {
    try {
      const estadosEquipos = await EstadoEquipo.find();
      res.render('estadoEquipo', { estadosEquipos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, estado } = req.body;
      const nuevoEstadoEquipo = new EstadoEquipo({ nombre, estado });
      await nuevoEstadoEquipo.save();
      res.redirect('/estado-equipo');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, estado } = req.body;
      await EstadoEquipo.findByIdAndUpdate(id, { nombre, estado, fechaActualizacion: Date.now() });
      res.redirect('/estado-equipo');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = estadoEquipoController;
