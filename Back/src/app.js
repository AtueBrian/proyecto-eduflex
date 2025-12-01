const express = require('express');
//imagen config
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');

const clientes = require('./modulos/clientes/rutas')
const productos = require('./modulos/productos/rutas');
const categorias = require('./modulos/categorias/rutas');
const canjes = require('./modulos/canjes/rutas');
const auth = require('./modulos/auth/rutas')
const error = require('./red/errors')

const app = express();    

app.use(cors());
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes)  
app.use('/api/productos', productos);
app.use('/api/categorias', categorias);
app.use('/api/canjes', canjes);
app.use('/api/auth', auth)
app.use(error)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
module.exports = app;