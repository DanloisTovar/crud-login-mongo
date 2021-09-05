const { Router } = require('express');
const router = Router();

// importar rutas de notas:
const {
  renderNotasFormulario,
  renderNuevasNotas,
  renderMostarTodasLasNotas,
  renderEditarNotasFormulario,
  renderActualizarNotas,
  renderBorrarNotas,
} = require('../controllers/notas.controllers');

// autenticacion de sesiones y proteccion de las rutas:
const { sesionAutenticada } = require('../helpers/autorizacion-session');

// ruta agregar notas:
router.get('/notas/nueva-nota', sesionAutenticada, renderNotasFormulario);
router.post('/notas/enviar-nota', sesionAutenticada, renderNuevasNotas);

//ver todas las notas:
router.get('/notas', sesionAutenticada, renderMostarTodasLasNotas);

// editar notas:
router.get('/notas/editar/:id', sesionAutenticada, renderEditarNotasFormulario);
router.put('/notas/editar/:id', sesionAutenticada, renderActualizarNotas);

// borrar notas:
router.delete('/notas/borrar/:id', sesionAutenticada, renderBorrarNotas);
module.exports = router;
