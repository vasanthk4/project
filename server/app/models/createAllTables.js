const { createUserTable } = require('./user');
const { createStockTable } = require('./stock');
const { createPaymentTable } = require('./payment');
const { createStockExchangeTable } = require('./stockExchange');
const { pool } = require('../../config/configDB')

module.exports.createAllTables = () => {
  createUserTable(pool)
    .then(() => createStockTable(pool))
    .then(() => createPaymentTable(pool))
    .then(() => createStockExchangeTable(pool))
    .then(() => console.log("All Tables created successfully"))
    .catch((err) => console.log("Table creation was unsuccessful\n", err))
}