var usuario = require('../models/usuario');
var cripto = require("bcryptjs");
const { use } = require('../routes/rotas');

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

usuarioControlador.buscarUsuarioBanco = function(req,res){
    usuario.findAll({
        raw: true,
        where: {
            email: req.params.email
        }
    }).then(
        function(user){
            cripto.compare(req.body.senha, user.senha).then(
                function(result){
                    console.log(result)
                    console.log("Autenticado com sucesso!")
                    if(result){
                        res.status(200).redirect("/");
                    }else{
                        res.status(500).send("Erro nas credenciais ao logar!")
                    }
                }
            ).catch(
                function(erro){
                    res.status(500).send(`Erro: ${erro}`)
                }
            )
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar o usuário: ${erro}`)
        }
    )
}

usuarioControlador.verificaLogin = function (req, res) {
    
}
    


module.exports = usuarioControlador;