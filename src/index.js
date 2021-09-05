// dotenv siempre de primero para evitar errores:
const dotenv = require('dotenv').config();
const app = require('./server');
const db = require('./database');

app.serverEscucha();
