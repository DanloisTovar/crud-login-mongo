// configurar base de datos:
const mongoose = require('mongoose');

const { APP_NOTAS_HOST, APP_NOTAS_DATABASE_NOMBRE } = process.env;

const MONGODB_URI = `mongodb://${APP_NOTAS_HOST}/${APP_NOTAS_DATABASE_NOMBRE}`;
mongoose
  .connect(MONGODB_URI, {
    // resuelve error:
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  .then((db) => {
    console.log('La base de datos se ha conectado de manera exitosa!!!');
  })
  .catch((err) => {
    console.log(err);
  });
