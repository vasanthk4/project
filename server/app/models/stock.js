const {pool} = require('../../config/configDB');

module.exports.createStockTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists stock(" + 
    "id varchar(255) primary key," +
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

module.exports.addDefaultStocks = (stocks) => {
  return new Promise((resolve, reject) => {
    let query = "insert ignore into stock values"
    stocks.forEach((stock) => {
      const {stockname, photo, price} = stock;
      query += `(uuid(), '${stockname}', '${photo}', ${price}),`
    })
    query = query.slice(0,-1);
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
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