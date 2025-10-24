require('dotenv').config();
const sqlDb = process.env.SQL_DATABASE
const password = process.env.SQL_PASSWORD
const host = process.env.SQL_HOST
const username = process.env.SQL_USERNAME
const dialect = process.env.SQL_DIALECT

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: process.env.DB,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: username,
    password: password,
    database: sqlDb,
    host: host,
    dialect: dialect,
  },
}
