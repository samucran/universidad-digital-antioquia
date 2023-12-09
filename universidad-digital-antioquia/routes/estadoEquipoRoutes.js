const express = require('express');
const router = express.Router();
const estadoEquipoController = require('/controllers/estadoEquipoController');

// definir rutas
router.get('/', (req, res, next) => {
    if (req.usuario.rol === 'docente') {
      return res.status(403).json({ error: 'Acceso no autorizado para este rol' });
    }
    next();
  }, inventarioController.getAll);

router.post('/', (req, res, next) => {
    if (req.usuario.rol !== 'administrador') {
      return res.status(403).json({ error: 'Acceso no autorizado para este rol' });
    }
    next();
  }, inventarioController.create);
router.get('/', estadoEquipoController.getAll);
router.post('/', estadoEquipoController.create);
router.put('/:id', estadoEquipoController.update);

module.exports = router;
