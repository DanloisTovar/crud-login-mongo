const helpers = {};

helpers.sesionAutenticada = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash(
      'mensajes_de_errores',
      'No estas autorizado. Por favor inicia sesion o registrate.'
    );
    res.redirect('/usuarios/iniciar-sesion');
  }
};

module.exports = helpers;
