const {pool} = require('../../config/configDB');

module.exports.createPaymentTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists payment(" + 
    "id varchar(255) unique," +
    "amount float," +
    "userId varchar(255)," +
    "accountNumber bigint)"
    localPool.query(query, (err, data) => {
      if(err) reject(err)
      else {
        console.log("User Table Created!")
        resolve(data)
      }
    })
  })
}

module.exports.acceptPayment = (payment) => {
  return new Promise((resolve, reject) => {
    const { amount, id, accountNumber } = payment
    if(amount && id && accountNumber) {
      const query = `insert into payment values( uuid(), ${amount}, '${id}', '${accountNumber}')`;
      pool.query(query, (err, data) => {
        if(err) reject(err)
        else resolve(amount)
      })
    }
    else reject({success: false, errorMessage: "Please enter valid user details"})
  })
}