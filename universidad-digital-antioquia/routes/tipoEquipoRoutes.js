const express = require('express');
const router = express.Router();
const tipoEquipoController = require('/controllers/tipoEquipoController');

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
router.get('/', tipoEquipoController.getAll);
router.post('/', tipoEquipoController.create);
router.put('/:id', tipoEquipoController.update);

module.exports = router;
