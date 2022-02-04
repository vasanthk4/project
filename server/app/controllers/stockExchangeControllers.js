const { exchangeStock } = require('../models/stockExchange');
const { spendWallet } = require('../models/user');

module.exports.exchangeStock = (req, res) => {
  const {userId, stockId, quantity, amount, exchangeType} = req.body;
  exchangeStock({userId, stockId, quantity, amount, exchangeType})
    .then(() => {
      return spendWallet(id, amount)
    })
    .then(() => res.json({success: true, message: "Stock purchased successfully"}))
    .catch( err => {console.log(err); res.status(500).json({success: false, message: "Error while payment"})})
}