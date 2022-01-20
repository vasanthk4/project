const { createUserTable } = require('./user');
const { createStockTable } = require('./stock');
const { pool } = require('../../config/configDB')

module.exports.createAllTables = () => {
  createUserTable(pool)
    .then(() => createStockTable(pool))
    .then(() => console.log("All tables created successfully"))
    .catch((err) => console.log("Table creation was unsuccessful\n", err))
}