const {pool} = require('../../config/configDB');

module.exports.createPaymentTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists payment(" + 
    "id varchar(255) unique," +
    "amount float," +
    "userId varchar(255)," +
    "accountNumber bigint," + 
    "date  datetime default now())" 
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
      const query = `insert into payment(id, amount, userId, accountNumber) values( uuid(), ${amount}, '${id}', '${accountNumber}')`;
      pool.query(query, (err, data) => {
        if(err) reject(err)
        else resolve(amount)
      })
    }
    else reject({success: false, errorMessage: "Please enter valid user details"})
  })
}

module.exports.getUserPayments = (userId) => {
  return new Promise((resolve, reject) => {
    if(userId) {
      const query = `select id, amount, date from payment where userId='${userId}'`
      pool.query(query, (err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    }
  })
}