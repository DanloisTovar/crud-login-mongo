const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// inicializando servidor:
const app = express();
require('./config/passport');

function serverEscucha() {
  // servidor escucha:
  app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando por el puerto ${app.get('port')}!!!`);
  });
}

/* configuracion: */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

/* configurar plantilla */
app.engine(
  '.hbs',
  exphbs({
    // plantilla principal:
    defaultLayout: 'main',
    // direccion de plantillas:
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // resolver error de recorido de objetos:
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set('view engine', '.hbs');

/* middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// siempre colocar despues del urlencoded:
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
/* variables globales: */

app.use((req, res, next) => {
  res.locals.mensajeDeExito = req.flash('mensaje_de_exito');
  res.locals.mensajeDeErrores = req.flash('mensajes_de_errores');
  res.locals.mensajeDelogout = req.flash('mensaje_de_logout');
  /*mesajes de error de passport : 
  los errores de passport se manejan con el nombre en el req.flash: como "error" */
  res.locals.mensajeDeErroresPassport = req.flash('error');

  // los datos del usuario en pasport  siempre se guardan en req.user.
  res.locals.usuarioPassport = req.user || null;
  next();
});

/* routes: */
app.use(require('./routes/index.routes'));
app.use(require('./routes/notas.routes'));
app.use(require('./routes/usuarios.routes'));

/* archivos staticos: */
app.use(express.static(path.join(__dirname, 'public')));

// exportar modulo:
module.exports = { app, serverEscucha };
