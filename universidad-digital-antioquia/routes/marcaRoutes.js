const express = require('express');
const router = express.Router();
const marcaController = require('/controllers/marcaController');

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
router.get('/', marcaController.getAll);
router.post('/', marcaController.create);
router.put('/:id', marcaController.update);

module.exports = router;
