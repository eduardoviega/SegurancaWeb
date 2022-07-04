var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var computador = banco.define("computador",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    marca: {
        type: sequelize.STRING(25),
        allowNull: false,
    },
    memoriaRam: {
        type: sequelize.STRING(8),
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

computador.sync() //cria a tabela

module.exports = computador