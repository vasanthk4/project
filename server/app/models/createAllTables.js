const { createUserTable } = require('./user');
const { pool } = require('../../config/configDB')

const createAnotherTable = () => {
  return new Promise((resolve, reject) => {
    resolve("Another Table created!!")
  })
}

module.exports.createAllTables = () => {
  createUserTable(pool)
    .then(() => createAnotherTable())
    .then(() => console.log("Table creations successful!"))
    .catch((err) => console.log("Table creation was unsuccessful\n", err))
}