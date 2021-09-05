const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema(
  {
    nombre: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
  },
  {
    // cuando fue creado y cuando fue actualizado el schema:
    timestamps: true,
  }
);

// encriptar password:
UsuarioSchema.methods.encriptarPassword = async (password) => {
  // const salt = await bcrypt.genSaltSync(10);
  // return await bcrypt.hash(password, salt);
  const passwordHasheado = await bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  );
  return passwordHasheado;
};

// comparar password:

/* OJOOOOO: ACA TENGO LA DUDA CON LA FUNCION SI DEBO COLOCAR ASYNC (resuelto)*/
UsuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creacion de modelo:
module.exports = model('Usuario', UsuarioSchema);
