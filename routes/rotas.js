const express = require("express");
const controlador = require("../controllers/controlador");
const controladorUsuarios = require("../controllers/controladorUsuarios");

const rotas = express.Router();

rotas.get("/", controlador.buscarComputadoresBanco);
//rotas.get("/:id", controlador.buscarComputador);
//rotas.get("/marca/:marca", controlador.marca);
//rotas.get("/mais/:memoriaRam", controlador.memoriaRam);
rotas.post("/", controlador.inserirComputadorBanco);
rotas.put("/:id", controlador.atualizarComputadorBanco);
rotas.delete("/:id", controlador.removerComputadorBanco);

rotas.get("/cadastrar", controlador.cadastro);
rotas.get("/editar/:id",controlador.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReq/:id",controlador.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id",controlador.montarReqDelete)  //monta requisição de remoção


//autenticação
rotas.get("/login", controladorUsuarios.mostrarFormLogin);
rotas.post("/login/:email", controladorUsuarios.buscarUsuarioBanco);
rotas.get("/cadastro", controladorUsuarios.mostrarFormCadastro);
rotas.post("/cadastrar/usuario", controladorUsuarios.inserirUsuarioBanco);

module.exports = rotas;