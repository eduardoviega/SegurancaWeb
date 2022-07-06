var computador = require('../models/computador');
var axios = require("axios")
var qs = require("querystring")

const computadorControlador = {};

var listaComputadores = []

//CREATE
computadorControlador.inserirComputadorBanco = function (req, res) {
    computador.create({
        descricao: req.body.descricao,
        marca: req.body.marca,
        memoriaRam: req.body.memoriaRam
    }).then(
        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar computador: " + error);
        }
    )
}


//READ
computadorControlador.buscarComputadoresBanco = function(req,res){
    computador.findAll({
        raw: true
    }).then(
        function(dados){
            res.render("inicio",{computadores: dados})
            console.log(dados)
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar os computadores: ${erro}`)
        }
    )
}

//UPDATE
computadorControlador.atualizarComputadorBanco = function (req, res) {
    erros = []
    
    computador.update({
        descricao: req.body.descricao,
        marca: req.body.marca,
        memoriaRam: req.body.memoriaRam
    },{
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao atualizar a computador: " + error)
        }
    )
}

//DELETE
computadorControlador.removerComputadorBanco = function (req, res) {
    computador.destroy(
        {
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao remover computador: " + error)
        }
    )
}


//CÓDIGOS UTILIZADOS NA LISTA

//GET 
/*computadorControlador.buscar = function (req, res) {
    //res.status(200).send(listaComputadores);
    res.render("inicio",{
        computadores: listaComputadores
    })
};*/

//GET
/*computadorControlador.buscarComputador = function (req, res) {
    for(var i=0;i<listaComputadores.length;i++){
        if(listaComputadores[i].getId()==req.params.id){
            try {
                res.status(200).send(listaComputadores[i]);
            } catch (error) {
                res.status(500).send("Erro ao buscar computador: " + error);
            } 
            return
        }
    }
    res.status(500).send("Id informado não existe");
};*/

//GET
/*computadorControlador.marca = function (req,res){
    var computadoresMarca = []
    for(var i=0;i<listaComputadores.length;i++){
        if(listaComputadores[i].getMarca()==req.params.marca){
            computadoresMarca.push(listaComputadores[i])
        }
    }

    if(computadoresMarca.length > 0){
        try {
            res.status(200).send(computadoresMarca);
        } catch (error) {
            res.status(500).send("Erro ao buscar computadores: " + error);
        } 
    } else {
        res.status(500).send("Não existe computador com esta marca na lista");
    }
}

//GET
computadorControlador.memoriaRam = function (req,res){
    var computadoresMemoriaRam = []
    for(var i=0;i<listaComputadores.length;i++){
        if(Number(listaComputadores[i].getMemoriaRam())>=Number(req.params.memoriaRam)){
            computadoresMemoriaRam.push(listaComputadores[i])
        }
    }

    if(computadoresMemoriaRam.length > 0){
        try {
            res.status(200).send(computadoresMemoriaRam);
        } catch (error) {
            res.status(500).send("Erro ao buscar computadores: " + error);
        } 
    } else {
        res.status(500).send(`Não existe computador com mais de ${req.params.memoriaRam} GB de memória RAM!`);
    }
}*/

//POST
/*computadorControlador.criar = function (req, res) {
    try {
        var novoComputador = new Computador(req.body.id,req.body.descricao,req.body.marca,req.body.memoriaRam)
        listaComputadores.push(novoComputador)

        res.status(200).redirect("/");
    } catch (error) {
        res.status(500).send("Erro ao criar computador: " + error);
    }
};*/

//PUT
/*computadorControlador.atualizar = function (req, res) {
    for(var i=0;i<listaComputadores.length;i++){
        if(listaComputadores[i].getId()==req.params.id){
            try {
                listaComputadores[i].setDescricao(req.body.descricao)
                listaComputadores[i].setMarca(req.body.marca)
                listaComputadores[i].setMemoriaRam(req.body.memoriaRam)
                res.sendStatus(200);
            } catch (error) {
                res.status(500).send("Erro ao atualizar a computador: " + error);
            } 
            return
        }
    }
    res.status(500).send("Id informado não existe" );
};*/

/*//DELETE
computadorControlador.apagar = function (req, res) {
    for(var i=0;i<listaComputadores.length;i++){
        if(listaComputadores[i].getId()==req.params.id){
            try {
                listaComputadores.splice(i,1)
                res.sendStatus(200);
            } catch (error) {
                res.status(500).send("Erro ao remover o computador" + error);
            } 
            return
        }
    }
    res.status(500).send("Id informado não existe");
};
*/


//métodos do handlebars
computadorControlador.cadastro = function (req, res) {
    try {
        res.render("cadastro")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

//solicitarEditarFormulario
computadorControlador.editarFormulario = function(req,res){
    computador.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(pc){
            res.render("editarForm",{
                idComputador: req.params.id,
                pcDescricao: pc.descricao,
                pcMarca: pc.marca,
                pcMemoriaRam: pc.memoriaRam
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error)
        }
    )
}

//montarRequisiçãoEditar
computadorControlador.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
            descricao: req.body.descricao,
            marca: req.body.marca,
            memoriaRam: req.body.memoriaRam,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "54.207.99.25",
                port: 80
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o computador: " + err);
    })
}

//montarRequisiçãoRemover
computadorControlador.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,{
        proxy:{
            host: "54.207.99.25",
            port: 80
        }
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um computador: " + err);
        })
}




module.exports = computadorControlador;