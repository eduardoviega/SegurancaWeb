var express = require("express")
var handlebars = require("express-handlebars")
var rotas = require("./routes/rotas")
// var passport = require("passport")
var session = require("express-session")
var flash = require("connect-flash")
// require("./configs/security")(passport)

var servidor = express()
const PORTA = 3000

servidor.use(session({
    secret: "aulanode",
    resave: true,
    saveUninitialized: true
}))
servidor.use(flash())

//Midleware
servidor.use((req,res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// servidor.use(passport.initialize())
// servidor.use(passport.session())

servidor.engine("handlebars", handlebars.engine({defaultLayout:"main"}));
servidor.set("view engine","handlebars");

servidor.use(express.urlencoded({ extended: true }));
servidor.use(rotas)

servidor.listen(PORTA,function(){
    console.log("Servidor http rodando na porta " + PORTA + "...");
})