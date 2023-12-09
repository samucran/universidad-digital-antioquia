const Marca = require('/models/Marca');

const marcaController = {
  getAll: async (req, res) => {
    try {
      const marcas = await Marca.find();
      res.render('marca', { marcas });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, estado } = req.body;
      const nuevaMarca = new Marca({ nombre, estado });
      await nuevaMarca.save();
      res.redirect('/marca');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, estado } = req.body;
      await Marca.findByIdAndUpdate(id, { nombre, estado, fechaActualizacion: Date.now() });
      res.redirect('/marca');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = marcaController;
