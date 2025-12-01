const db = require('../../DB/mysql');

//contraseña
const bcrypt = require('bcrypt');
const TABLA = 'clientes';



module.exports = function (dbinyectada){

    let db = dbinyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }

    function todos () {
        return db.todos(TABLA)
    }

    function uno (id) {
        return db.uno(TABLA, id)
    }

     async function agregar (body){

        if (body.password) {
            body.password =   await bcrypt.hash(body.password.toString(), 5);
        }
        return db.agregar(TABLA, body)
    }

    function eliminar (body){
        return db.eliminar(TABLA, body)
    }

    return{
    todos,
    uno,
    agregar,
    eliminar
    }
}