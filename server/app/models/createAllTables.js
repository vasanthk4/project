const { createUserTable } = require('./user');
const { createStockTable } = require('./stock');
const { createPaymentTable } = require('./payment');
const { createStockExchangeTable } = require('./stockExchange');
const { createPortfolioTable } = require('./portfolio');
const stockData = require('../defaultData/stockData');
const { addDefaultStocks } = require('../models/stock');
const { pool } = require('../../config/configDB')

const addDefaultData = async () => {
  await addDefaultStocks(stockData)
  console.log("Default Data added")
}

module.exports.createAllTables = () => {
  createUserTable(pool)
    .then(() => createStockTable(pool))
    .then(() => createPaymentTable(pool))
    .then(() => createStockExchangeTable(pool))
    .then(() => createPortfolioTable(pool))
    .then(() => {
      console.log("All Tables created successfully")
      addDefaultData()
    })
    .catch((err) => console.log("Table creation was unsuccessful\n", err))
}