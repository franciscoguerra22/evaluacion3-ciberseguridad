const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // Vulnerabilidad intencional: El nombre recibido por la URL no se limpia, permitiendo inyección de scripts (XSS).
  const nombre = req.query.nombre || 'Mundo';
  res.send(`<h1>¡Hola ${nombre}!</h1><p>Aplicación web en ejecución para la Auditoría de Seguridad.</p>`);
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
