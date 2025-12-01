const db = require('../../DB/mysql');
const auth = require('../../auth');
const bcrypt = require('bcrypt');
const TABLA = 'clientes';



module.exports = function (dbinyectada){

    let db = dbinyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    // async function login(usuario, password){
    //     const data = await db.query(TABLA, {usuario: usuario})

    //     return bcrypt.compare(password, data.password)
    //     .then(resultado => {
    //         if (resultado === true) {
    //             //Generar token
    //             return auth.asignarToken({...data})
    //         }
    //         else{
    //             throw new Error('Informacion Invalida');
    //         }
    //     })
    // }

      async function login(usuario, password) {
    const data = await db.query(TABLA, { usuario: usuario });

    if (!data) {
      throw new Error('Usuario no encontrado');
    }

    const passwordValida = await bcrypt.compare(password, data.password);

    if (!passwordValida) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar token con la info básica
    const token = auth.asignarToken({ id: data.id, usuario: data.usuario, tipoUsuario: data.tipoUsuario });

    // Devolver token + tipoUsuario
    return {
      token,
      idCliente: data.id,
      tipoUsuario: data.tipoUsuario
    };
  }


    return{
    login,
    }
}