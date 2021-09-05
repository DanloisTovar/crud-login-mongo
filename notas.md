Sobre la aplicacion.

Instalar:

Dependencias principales:

npm i express connect-flash bcryptjs express-handlebars express-session method-override mongoose passport passport-local

Dependencias de Desarrollo:

npm i dotenv nodemon npm-check-updates -D

npm i handlebars --> se debe colocar para evitar el error de recorrido objetos con el foreach. La solucion esta descrita, mas abajo.

descripcion de paquetes:

express framework para servidor node:

connect-flash: para mensajes (alertas) en distintas vistas.

bcryptjs: hashear o encryptar datos.

express-handlebars: para uso de plantillas hbs.

express-session: matener sesiones le login.

method-override: para uso de put, delete.

mongoose: framework para mongoDB.

passport: para autenticacion de usuarios.

passport-local: para autenticacion con bases de datos locales.

dotenv: para utilizar variables de entorno.

nodemon: reinicia automaticamente el servidor cada vez que se hace un cambio.

handlebars: plantilla (se instala solo en caso de que aparezca el error de no reconocer datos, instalar solo en entorno de desarrollo)

Funcionaminto:

El funcionamiento de esta aplicacion consiste en ejecutar un crud. Adicioanlmente para utilizarla, el usuario debera registrarse y loguearse, cabe destacar que cada regitro sera independiente y unico para cada usuario.

Observaciones:

se debe importar dotenv al principio del index.js para evitar errores de conexion con mongoose, ya que fue un dolor de cabeza.

handlebar me dio el siguiente errore de compilacion:

Handlebars: Access has been denied to resolve the property "titulo" because it is not an "own property" of its parent.

se resolvio con los siguientes pasos:

se debe instalar el paquete handlebars:

npm i handlebars

luego leer lo que dice en este enlace:

https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details

y colocando los siguentes comandos en la configuración de platilla hbs:

runtimeOptions: {
allowProtoPropertiesByDefault: true,
allowProtoMethodsByDefault: true,
},

como debe quedar la configuracion de plantilla:

/_ configurar plantilla _/
app.engine(
'.hbs',
exphbs({
// plantilla principal:
defaultLayout: 'main',
// direccion de plantillas:
layoutsDir: path.join(app.get('views'), 'layouts'),
partialsDir: path.join(app.get('views'), 'partials'),
extname: '.hbs',

// AQUI SE DEBE COLOCAR para resolver error de recorido de objetos:
runtimeOptions: {
allowProtoPropertiesByDefault: true,
allowProtoMethodsByDefault: true,
},
})
);

otra opcion es desisntalar la version reciente de handlebars e instalar la version:
npm i -D handlebars@4.5.0
quede en el 16

Error en mongoose:

(node:40933) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

esto se resuelve colocando la siguiente linea la configuracion de la base de datos:
""useCreateIndex: true"

Ejemplo:

mongoose
.connect(MONGODB_URI, {
// resuelve error:
useUnifiedTopology: true,
useCreateIndex: true, -> AQUI VA!!
useNewUrlParser: true,
})

Gracias por leerme...

Danlois Tovar - Web Developer.
