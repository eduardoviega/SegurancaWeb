var usuario = require('../models/usuario');
var cripto = require("bcryptjs");

const usuarioControlador = {};

var listaUsuarios = []

//métodos do handlebars
usuarioControlador.mostrarFormLogin = function (req, res) {
    try {
        res.render("login")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de login: " + error);
    }
};
usuarioControlador.mostrarFormCadastro = function (req, res) {
    try {
        res.render("cadastroUsuario")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};


//CREATE
usuarioControlador.inserirUsuarioBanco = async function (req, res) {
    var password = await cripto.hash(req.body.senha,8)
    usuario.create({
        email: req.body.email,
        senha: password
    }).then(
        function(){
            res.status(200).redirect("/login");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar usuário: " + error);
        }
    )
}

usuarioControlador.verificaLogin = function (req, res) {
    usuario.create({
        email: req.body.email,
        senha: req.body.senha
    }).then(
        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar usuário: " + error);
        }
    )
}




module.exports = usuarioControlador;