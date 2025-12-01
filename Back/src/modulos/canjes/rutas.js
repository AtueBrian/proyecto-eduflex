const express = require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

// Listar canjes (opcional: admin o por cliente)
router.get('/', listar);
router.get('/:idCliente', listarPorCliente);

// Registrar nuevo canje
router.post('/', seguridad(), realizarCanje);

async function listar(req, res, next) {
  try {
    const items = await controlador.listar();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function listarPorCliente(req, res, next) {
  try {
    const idCliente = req.params.idCliente;
    const items = await controlador.listarPorCliente(idCliente);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}


async function realizarCanje(req, res, next) {
  try {
    const resultado = await controlador.realizarCanje(req.body);
    respuesta.success(req, res, resultado, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
