const {pool} = require('../../config/configDB');

module.exports.createStockTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists stock(" + 
    "id varchar(255)," +
    "stockname varchar(50) unique," +
    "photo varchar(10)," +
    "price float(10,2))";
    localPool.query(query, (err, data) => {
      if(err) reject(err)
      else {
        console.log("Stock Table Created!")
        resolve(data)
      }
    })
  })
}

module.exports.addStock = (stock) => {
  return new Promise((resolve, reject) => {
    const {stockname, photo, price} = stock
    if(stockname && photo && price) {
      const query = `insert into stock values( uuid(),'${stockname}', '${photo}', ${price})`;
      pool.query(query, (err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    }
    else reject({success: false, errorMessage: "Please enter valid user details"})
  })
}

module.exports.findStock = (stockname) => {
  return new Promise((resolve, reject) => {
    const query = `select * from stock where stockname='${stockname}' limit 1`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data[0])
    })
  })
}

module.exports.allStocks = () => {
  return new Promise((resolve, reject) => {
    const query = `select stockname from stock`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}