const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuario');

passport.use(
  'inicio-de-sesion',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      //   confirmar correo:
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return done(null, false, { message: 'El usuario no existe.' });
      } else {
        // comparar password:
        const hasheoPassword = await usuario.matchPassword(password);

        if (hasheoPassword) {
          return done(null, usuario);
        } else {
          done(null, false, {
            message:
              'Password incorrecto. Por favor verifiquelo y vuelva a intentarlo.',
          });
        }
      }
    }
  )
);

// guardar el usaurio en passport para las sesiones:

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (error, usuario) => {
    done(error, usuario);
  });
});
