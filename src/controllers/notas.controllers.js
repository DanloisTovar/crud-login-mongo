// modelo de la bd:
const Nota = require('../models/Nota');

const notasControllers = {};

// formulario:
notasControllers.renderNotasFormulario = (req, res) => {
  // console.log(req.user.id); datos de usuario en passport:
  res.render('notas/nueva-nota-form');
};
/* crear nueva nota: */
notasControllers.renderNuevasNotas = async (req, res) => {
  // optener datos del formulario:
  const { titulo, descripcion } = req.body;

  /*  guardar datos enla DB: */
  const nuevaNota = new Nota({ titulo, descripcion });
  // datos de usuario en passport (id):
  nuevaNota.usuarioId = req.user.id;
  await nuevaNota.save();
  // notificacion:
  req.flash('mensaje_de_exito', 'La nota fue creada de manera exitosa!');
  res.redirect('/notas');
  // console.log(nuevaNota);
};
/* ver todas las notas: */
notasControllers.renderMostarTodasLasNotas = async (req, res) => {
  // buscar notas:
  const mostrarNotas = await Nota.find({ usuarioId: req.user.id }).sort({
    createdAt: 'desc',
  });

  // mostrar notas:
  res.render('notas/todas-las-notas', { mostrarNotas });
};

/* editar notas: */
notasControllers.renderEditarNotasFormulario = async (req, res) => {
  const verNotasAEditar = await Nota.findById(req.params.id);
  if (verNotasAEditar.usuarioId != req.user.id) {
    req.flash(
      'mensajes_de_errores',
      'No estas autorizado para esta operacion en otro usuario.'
    );
    return res.redirect('/notas');
  }
  res.render('notas/editar-notas', { verNotasAEditar });
  // console.log(verNotasAEditar);
};

notasControllers.renderActualizarNotas = async (req, res) => {
  const { titulo, descripcion } = req.body;
  await Nota.findByIdAndUpdate(req.params.id, { titulo, descripcion });
  // console.log(req.body);
  // notificacion:
  req.flash('mensaje_de_exito', 'La nota fue actualizada de manera exitosa!');
  res.redirect('/notas');
};

/* borrar notas: */

notasControllers.renderBorrarNotas = async (req, res) => {
  // crear usuario para chequear y borrar:
  const usuarioAutorizadoparaBorrar = await Nota.findById(req.params.id);

  if (usuarioAutorizadoparaBorrar.usuarioId != req.user.id) {
    req.flash(
      'mensajes_de_errores',
      'No estas autorizado para esta operacion en otro usuario.'
    );
    return res.redirect('/notas');
  }
  const borrarNota = await Nota.findByIdAndDelete(req.params.id);
  // notificacion:
  req.flash('mensaje_de_exito', 'La nota fue eliminada de manera exitosa!');
  res.redirect('/notas');
};

module.exports = notasControllers;
