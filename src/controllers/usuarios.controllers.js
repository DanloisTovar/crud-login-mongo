const usuariosControllers = {};

// importar passport y  modelo usuario:
const passport = require('passport');
const Usuario = require('../models/Usuario');

usuariosControllers.renderFormularioRegistro = (req, res) => {
  res.render('usuarios/registro');
};

usuariosControllers.renderRegistarUsuarios = async (req, res) => {
  // obtener datos de la pagina:
  const { nombre, email, password, confirmar_password } = req.body;
  // errores:
  const errores = [];
  if (password != confirmar_password) {
    errores.push({ text: 'Los passwords no coinciden, verifique sus datos.' });
  }
  if (password.length < 4) {
    errores.push({
      text: 'El password debe tener mas de 4 digitos, por favor vuelva a intentarlo.',
    });
  }
  if (errores.length > 0) {
    res.render('usuarios/registro', {
      errores,
      nombre,
      email,
    });
  } else {
    const emailUsuario = await Usuario.findOne({ email: email });

    if (emailUsuario) {
      req.flash(
        'mensajes_de_errores',
        'El correo  ya esta en uso, verifique lo datos y vuelva a intentarlo.'
      );

      res.redirect('/usuarios/registro');
    } else {
      const nuevoUsuario = new Usuario({ nombre, email, password });
      nuevoUsuario.password = await nuevoUsuario.encriptarPassword(password);
      await nuevoUsuario.save();
      req.flash(
        'mensaje_de_exito',
        'El usaurio ha sido creado satisfactoriamente.'
      );
      res.redirect('/usuarios/iniciar-sesion');
    }
  }
};

usuariosControllers.renderFormularioInicioSesion = (req, res) => {
  res.render('usuarios/inicio-sesion');
};

usuariosControllers.renderIniciarSesionUsuarios = passport.authenticate(
  'inicio-de-sesion',
  {
    failureRedirect: '/usuarios/iniciar-sesion',
    successRedirect: '/notas',
    // el flash error por defecto en passport se llama error o se maneja mediante este nombre
    failureFlash: true,
  }
);

usuariosControllers.renderLogoutUsuarios = (req, res) => {
  req.logout();
  req.flash('mensaje_de_logout', 'Se ha cerrado la sesion satisfactoriamente.');
  res.redirect('/usuarios/iniciar-sesion');
};

module.exports = usuariosControllers;
