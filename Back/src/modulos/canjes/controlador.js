const TABLA = 'canjes';
const nodemailer = require("nodemailer");

module.exports = function (db) {
  
  function listar() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          c.id, 
          c.fecha, 
          c.puntosTotales, 
          cli.nombre AS cliente
        FROM ${TABLA} c
        INNER JOIN clientes cli ON c.idCliente = cli.id
      `;
      db.querySQL(sql)
        .then(resolve)
        .catch(reject);
    });
  }

  function listarPorCliente(idCliente) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        c.id AS idCanje,
        c.fecha AS fechaCanje,
        d.idProducto,
        p.nombre,
        CONCAT('http://localhost:4000/uploads/', p.imagen) AS imagen,
        d.cantidad,
        d.puntosUsados
      FROM ${TABLA} c
      INNER JOIN detalle_canje d ON c.id = d.idCanje
      INNER JOIN productos p ON d.idProducto = p.id
      WHERE c.idCliente = ?
      ORDER BY c.fecha DESC
    `;
    db.querySQL(sql, [idCliente])
      .then(resolve)
      .catch(reject);
  });
}


async function realizarCanje(body) {
  // get puntos del cliente
  const cliente = await db.querySQL('SELECT puntos FROM clientes WHERE id = ?', [body.idCliente]);
  if (!cliente || cliente.length === 0) throw new Error("Cliente no encontrado");
  const puntosCliente = cliente[0].puntos;

  // get stock del producto
  const producto = await db.querySQL('SELECT puntosRequeridos, stock FROM productos WHERE id = ?', [body.idProducto]);
  if (!producto || producto.length === 0) throw new Error("Producto no encontrado");
  const puntosPorProducto = producto[0].puntosRequeridos;
  const stockActual = producto[0].stock;

  // validacion de puntos
  const puntosNecesarios = body.cantidad * puntosPorProducto;
  if (puntosCliente < puntosNecesarios) {
    throw new Error("No tenés suficientes puntos para canjear este producto");
  }

  // validacion de stock
  if (stockActual < body.cantidad) {
    throw new Error(`No hay suficiente stock del producto. Stock disponible: ${stockActual}`);
  }

  // insert del canje
  const resultadoCanje = await db.querySQL(
    `INSERT INTO ${TABLA} SET idCliente = ?, fecha = ?, puntosTotales = ?`,
    [body.idCliente, new Date(), puntosNecesarios]
  );
  const idCanje = resultadoCanje.insertId;

  // insert detalle_canje
  await db.querySQL(
    'INSERT INTO detalle_canje SET idCanje = ?, idProducto = ?, cantidad = ?, puntosUsados = ?',
    [idCanje, body.idProducto, body.cantidad, puntosNecesarios]
  );

  // Se descuentan los puntos al cliente
  await db.querySQL(
    'UPDATE clientes SET puntos = ? WHERE id = ?',
    [puntosCliente - puntosNecesarios, body.idCliente]
  );

  // Se descuenta el stock al producto
  await db.querySQL(
    'UPDATE productos SET stock = stock - ? WHERE id = ?',
    [body.cantidad, body.idProducto]
  );

  // llamamos a la funcion para mandar mail de notificacion al cliente
  await notificarCanje(idCanje);

  return { idCanje };
}


// Funcion para mandar mail al cliente
async function notificarCanje(idCanje) {

  const canje = await db.querySQL(`
    SELECT c.id, cli.nombre, cli.correo, c.fecha 
    FROM canjes c
    INNER JOIN clientes cli ON c.idCliente = cli.id
    WHERE c.id = ?`, [idCanje]);

  if (!canje || canje.length === 0) throw new Error("Canje no encontrado");

  const cliente = canje[0];

  // Configuracion remitente
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
  },
  });

  // Armado del mensaje
  const mensaje = {
    from: "gasparlucasfederico@gmail.com",
    to: cliente.correo,
    subject: "Confirmación de canje",
    text: `Hola ${cliente.nombre}, tu canje #${cliente.id} está listo. 
Podés pasar a retirarlo por la oficina. Fecha: ${cliente.fecha}`,
  };

  // Envia el mail
  await transporter.sendMail(mensaje);
  console.log("Correo enviado a:", cliente.correo);

  return { exito: true };
}

  return {
    listar,
    listarPorCliente,
    realizarCanje,
    notificarCanje
  };
};
