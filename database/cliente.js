const Sequelize = require("sequelize");
const connection = require("./database");

const Cliente = connection.define('clientes',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    telefone:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

Cliente.sync({force:false}).then(()=>{});

module.exports = Cliente;