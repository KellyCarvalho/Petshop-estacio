const Sequelize = require("sequelize");

const connection = new Sequelize('petshop','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;