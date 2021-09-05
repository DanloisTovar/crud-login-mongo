const { Schema, model } = require('mongoose');

const NotaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },

    // para guardar el id de cada usuario:
    usuarioId: {
      type: String,
      required: true,
    },
  },
  {
    // cuando fue creado y cuando fue actualizado el schema:
    timestamps: true,
  }
);

// creacion de modelo:
module.exports = model('Nota', NotaSchema);
