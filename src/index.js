// dotenv siempre de primero para evitar errores:
const dotenv = require('dotenv').config();
const app = require('./server');
const db = require('./database');

// servidor escucha:
app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando por el puerto ${app.get('port')}!!!`);
});
