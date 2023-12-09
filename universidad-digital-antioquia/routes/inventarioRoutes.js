const express = require('express');
const router = express.Router();
const inventarioController = require('/controllers/inventarioController');
const authMiddleware = require('/middlewares/authMiddleware');

router.use(authMiddleware);

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

router.get('/', inventarioController.getAll);
router.post('/', inventarioController.create);

module.exports = router;
