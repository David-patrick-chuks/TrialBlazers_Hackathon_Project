const { Sequelize } = require("sequelize");
const sqlDb = process.env.SQL_DATABASE
const password = process.env.SQL_PASSWORD
const host = process.env.SQL_HOST
const username = process.env.SQL_USERNAME
const dialect = process.env.SQL_DIALECT


const sequelize = new Sequelize(sqlDb, username, password, {
    host: host,
    dialect: "mysql"
});


module.exports = sequelize