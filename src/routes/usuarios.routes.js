const { Router } = require('express');
const router = Router();
const {
  renderFormularioRegistro,
  renderRegistarUsuarios,
  renderFormularioInicioSesion,
  renderIniciarSesionUsuarios,
  renderLogoutUsuarios,
} = require('../controllers/usuarios.controllers');

// formulario de registro:
router.get('/usuarios/registro', renderFormularioRegistro);
router.post('/usuarios/registro', renderRegistarUsuarios);

// formulario de inciio de sesion:
router.get('/usuarios/iniciar-sesion', renderFormularioInicioSesion);
router.post('/usuarios/iniciar-sesion', renderIniciarSesionUsuarios);

// Cerrar sesion:
router.get('/usuarios/cerrar-sesion', renderLogoutUsuarios);

module.exports = router;
