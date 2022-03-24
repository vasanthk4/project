const { resolve } = require('path');
const {addStock, findStock, allStocks, findStockById, updateStockWithId} = require('../models/stock');

module.exports.getAllStocks = (req, res) => {
  allStocks()
    .then((data) => {res.json(data)})
    .catch((err) => {res.status(500).json(err)})
}

module.exports.getStock = (req, res) => {
  const {stockname, id} = req.body
  if(id) {
    findStockById(id)
      .then((stock) => {res.json(stock)})
      .catch((err) => res.status(500).json(err))
  }
  else {
    findStock(stockname)
      .then((stock) => {res.json(stock)})
      .catch((err) => res.status(500).json(err))
  }
}

module.exports.insertStock = (req, res) => {
  const {stockname, photo, price} = req.body;
  if(stockname && photo && price) {
    addStock({stockname, photo, price})
      .then(() => {res.json({success: true, message: "Insertion Successful!!!"})})
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)})
  }
}

module.exports.getAllStocksAdmin = (req, res) => {
  allStocks(true)
    .then((data) => res.json(data))
    .catch(err => res.status(500).json(err))
}

module.exports.deleteStock = (req, res) => {
  const {id} = req.body
  removeStock(id)
    .then(() => {
      res.json({success: true})
    })
    .catch(err => {res.status(500).json(err)})
}

module.exports.updateStock = (req, res) => {
  const {id, stockname, price, photo} = req.body
  console.log(req.body)
  updateStockWithId({id, stockname, price, photo})
    .then(() => {
      res.json({success: true})
    })
    .catch(err => {console.log(err);res.status(500).json(err)})
}