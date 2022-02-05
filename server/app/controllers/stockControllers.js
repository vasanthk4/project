const {addStock, findStock, allStocks} = require('../models/stock');

module.exports.getAllStocks = (req, res) => {
  allStocks()
    .then((data) => {res.json(data)})
    .catch((err) => {res.status(500).json(err)})
}

module.exports.getStock = (req, res) => {
  const {stockname} = req.body
  findStock(stockname)
    .then((stock) => {res.json(stock)})
    .catch((err) => res.status(500).json(err))
}

module.exports.insertStock = (req, res) => {
  const {stockname, photo, price} = req.body;
  if(stockname && photo && price) {
    addStock({stockname, photo, price})
      .then(() => {res.json({success: true, message: "Insertion Successful!!!"})})
      .catch((err) => {res.status(500).json(err)})
  }
}