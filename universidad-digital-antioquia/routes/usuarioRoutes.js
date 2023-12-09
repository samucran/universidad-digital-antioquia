const express = require('express');
const router = express.Router();
const usuarioController = require('/controllers/usuarioController');

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
router.get('/', usuarioController.getAll);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);

module.exports = router;
