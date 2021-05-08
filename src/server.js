const path = require('path');

// inicializando servidor:
const express = require('express');
const app = express();

//configuracion:

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// middlewares:
app.use(express.urlencoded({ extended: false }));

// variables globales:

// routes:
app.get('/', (req, res) => {
  res.send('hola mundo!!!');
});

// archivos staticos:
app.use(express.static(path.join(__dirname, 'public')));

// exportar modulo:
module.exports = app;
