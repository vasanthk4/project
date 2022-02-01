const {acceptPayment} = require('../models/payment');
const {findUserById, updateWallet} = require('../models/user');

module.exports.acceptPayment = (req, res) => {
  const {amount, id} = req.body
  let wallet;
  findUserById(id)
    .then((user) => {
      const accountNumber = user[0].acc;
      wallet = user[0].wallet;
      return acceptPayment({amount, id, accountNumber})
    })
    .then((amount) => {
      amount = parseFloat(amount) + parseFloat(wallet);
      return updateWallet(amount, id)
    })
    .then((data) => {
      res.json({success: true, message: "Payment Successful!!"})
    })
    .catch(err => {console.log(err);res.status(500).json({error: "Error while payment"})})
}