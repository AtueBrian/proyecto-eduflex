const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const seguridad = require('./seguridad'); // opcional si querés proteger rutas

const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', todos);
router.get('/:id', uno);
router.post('/', seguridad(), upload.single('imagen'), agregar);
router.put('/', seguridad(), eliminar);

async function todos(req, res, next) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function uno(req, res, next) {
  try {
    const item = await controlador.uno(req.params.id);
    respuesta.success(req, res, item, 200);
  } catch (err) {
    next(err);
  }
}

// async function agregar(req, res, next) {
//   try {
//     const result = await controlador.agregar(req.body);
//     const mensaje =
//       req.body.id === 0
//         ? 'Producto guardado con éxito'
//         : 'Producto actualizado con éxito';
//     respuesta.success(req, res, mensaje, 201);
//   } catch (err) {
//     next(err);
//   }
// }
async function agregar(req, res, next) {
  try {
    if (req.file) {
      req.body.imagen = req.file.filename; // guardamos solo el nombre del archivo
    }

    const result = await controlador.agregar(req.body);
    const mensaje =
      req.body.id === 0
        ? 'Producto guardado con éxito'
        : 'Producto actualizado con éxito';
    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    next(err);
  }
}


async function eliminar(req, res, next) {
  try {
    await controlador.eliminar(req.body);
    respuesta.success(req, res, 'Producto eliminado satisfactoriamente', 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
