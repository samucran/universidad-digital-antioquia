const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, 'clave-secreta'); // reemplaza clave secreta

     const usuario = await Usuario.findById(decoded.usuario._id);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no válido' });
    }

    req.usuario = decoded.usuario;

    if (req.usuario.rol === 'docente') {
        const rutaPermitida = req.originalUrl === '/inventario';
        if (!rutaPermitida) {
          return res.status(403).json({ error: 'Acceso no autorizado para este rol' });
        }
      }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido' });
  }
};

module.exports = authMiddleware;
