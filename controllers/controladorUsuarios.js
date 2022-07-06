var usuario = require('../models/usuario');
var cripto = require("bcryptjs");

const usuarioControlador = {};

//métodos do handlebars
usuarioControlador.mostrarFormLogin = function (req, res) {
    try {
        res.render("login")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de login: " + error);
    }
};

usuarioControlador.cadastro = function (req, res) {
    try {
        res.render("cadastroUsuario")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};


//método para cadastrar o usuário no banco de dados
usuarioControlador.inserirUsuarioBanco = async function (req, res) {
    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha.length < 6){
        erros.push({texto: "Senha muito pequena!"})
    }

    if(erros.length > 0){//se existe algum erro
        res.render("cadastroUsuario",{errosNaPagina: erros})
    }else{
        var pass = await cripto.hash(req.body.senha,8)

        usuario.create({
            email: req.body.email,
            senha: pass,
            tipo: req.body.tipo
        }).then(
            function(){
                // erros.push({texto: "Usuário cadastrado com sucesso!"})
                // res.render("login",{validaNaPagina: erros})
                req.flash("success_msg", "Usuário cadastrado com sucesso!")
                res.status(200).redirect("/login")
            }
        ).catch(
            function(error){
                // erros.push({texto: "Erro ao cadastrar usuário!"})
                // res.render("cadastroUsuario",{errosNaPagina: erros})
                // res.status(500).send("Erro ao criar usuário: " + error)
                req.flash("error_msg", "Erro ao cadastrar usuário!")
                res.redirect("/cadastro/usuario")
            }
        )
    }
}

/* REFEITO COM PASSPORT
usuarioControlador.buscarUsuarioBanco = function(req,res){
    var erros = []

    usuario.findOne({
        raw: true,
        where: {
            email: req.body.email
        }
    }).then(
        function(user){
            cripto.compare(req.body.senha, user.senha).then(
                function(result){
                    console.log(result)
                    if(result){
                        erros.push({texto: "Login realizado com sucesso!"})
                        // res.render("inicio",{validaNaPagina: erros})
                        res.status(200).redirect("/");
                        // req.flash("success_msg", "Login realizado com sucesso!")
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
            res.status(500).send(`Erro ao buscar email: ${erro}`)
        }
    )
}*/

module.exports = usuarioControlador;