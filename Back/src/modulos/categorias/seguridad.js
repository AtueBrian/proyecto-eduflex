const auth = require('../../auth');

module.exports = function chequearAuth(){

    function middleware(req, res, next){
        //podria agregarse el req.body.tipousuario por parametro, para luego verificar si es == admin en index.js?
        auth.chequearToken.confirmarToken(req)
        next();
    }

    return middleware
}