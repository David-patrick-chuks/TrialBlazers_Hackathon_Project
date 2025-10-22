const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('errandhive', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize