var express = require("express")
var handlebars = require("express-handlebars")
var rotas = require("./routes/rotas")

var servidor = express()
const PORTA = 3000

servidor.engine("handlebars", handlebars.engine({defaultLayout:"main"}));
servidor.set("view engine","handlebars");

servidor.use(express.urlencoded({ extended: true }));
servidor.use(rotas)

servidor.listen(PORTA,function(){
    console.log("Servidor http rodando na porta " + PORTA + "...");
})