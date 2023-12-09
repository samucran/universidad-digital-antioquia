const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//conexion a MongoDB
mongoose.connect('mongodb://localhost/universidad-digital', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// configuración de rutas
const tipoEquipoRoutes = require('/routes/tipoEquipoRoutes');
const estadoEquipoRoutes = require('/routes/estadoEquipoRoutes');
const usuarioRoutes = require('/routes/usuarioRoutes');
const marcaRoutes = require('/routes/marcaRoutes');
const inventarioRoutes = require('/routes/inventarioRoutes');

app.use('/tipo-equipo', tipoEquipoRoutes);
app.use('/estado-equipo', estadoEquipoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/marca', marcaRoutes);
app.use('/inventario', inventarioRoutes);
app.use('/auth', authRoutes);

// iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

