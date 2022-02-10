const { getUsersPortfolio, addPortfolio } = require('../models/portfolio');

exports.getPortfolio = (req, res) => {
  const {id} = req.params
  getUsersPortfolio(id)
    .then( data => {
      res.json(data)
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({success: false, message: "Error while getting portfolio"})
    })
}

exports.updatePortfolio = (data) => {
  return new Promise((resolve, reject) => {
    const {userId, stockId, quantity, amount} = data;
    if(userId && stockId && quantity && amount) {
      addPortfolio(data) 
        .then( () => resolve({success: true, message: "Portfolio Updated"}))
        .catch( (err) => {
          console.log(err)
          reject({success: false, message: "Error while updating portfolio"})
        })
    }
    else reject({success: false, message: "Please enter all the details"})
  })
}