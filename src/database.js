// configurar base de datos:
const mongoose = require('mongoose');

const { APP_NOTAS_HOST, APP_NOTAS_DATABASE_NOMBRE } = process.env;

const MONGODB_URI = `mongodb+srv://${APP_NOTAS_HOST}/${APP_NOTAS_DATABASE_NOMBRE}`;
mongoose
  .connect(MONGODB_URI, {
    // resuelve error:
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })

  .then((db) => {
    console.log('La base de datos se ha conectado de manera exitosa!!!');
  })
  .catch((err) => {
    console.log('No se ha podido conetar a la base de datos!!! \n');
    console.log(err);
  });

/*..*/
