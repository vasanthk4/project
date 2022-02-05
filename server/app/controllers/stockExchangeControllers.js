const { exchangeStock, getExchangeHistory } = require('../models/stockExchange');
const { spendFromWallet, addToWallet, getWallet } = require('../models/user');

module.exports.exchangeStock = (req, res) => {
  let {userId, stockId, quantity, amount, exchangeType} = req.body;
  exchangeType = exchangeType.toLowerCase()
  getWallet(userId)
    .then(data => {
      if(exchangeType === "buy") {
        if(data.wallet > amount)
          return  exchangeStock({userId, stockId, quantity, amount, exchangeType})
        return Promise.reject({success: false, message: "Insufficient Balance"})
      }
      else 
        return  exchangeStock({userId, stockId, quantity, amount, exchangeType})
      
    })
    .then(() => {
      if(exchangeType === "buy")
        return spendFromWallet(userId, amount)
      return addToWallet(userId, amount)
    })
    .then(() => res.json({success: true, message: "Stock purchased successfully"}))
    .catch( err => {console.log(err); res.status(500).json({success: false, message: "Error while payment"})})
}

module.exports.getExchangeHistory = (req, res) => {
  const {id} = req.params;
  getExchangeHistory(id)
    .then( (data) => {res.json(data)})
    .catch(err => {console.log(err); res.status(500).json({success: false, message: "Error retrieving stock exchange history"})})
}