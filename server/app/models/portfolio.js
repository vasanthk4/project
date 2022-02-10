const {pool} = require('../../config/configDB');

exports.createPortfolioTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists portfolio(" + 
    "id varchar(255)," +
    "stockId varchar(255)," +
    "userId varchar(255), " +
    "quantity int," +
    "amount float(20, 2)," + 
    "primary key (stockId, userId)," +
    "foreign key (userId) references user(id) on delete cascade," +
    "foreign key (stockId) references stock(id) on delete cascade" +
    ")";
    localPool.query(query, (err, data) => {
      if(err) reject(err)
      else {
        console.log("Portfolio Table Created!")
        resolve(data)
      }
    })
  })
}

exports.addPortfolio = (port) => {
  return new Promise((resolve, reject) => {
    const {stockId, userId, quantity, amount} = port;
    const query1 = `select * from portfolio where userId='${userId}' and stockId='${stockId}' limit 1`
    pool.query(query1, (err, data) => {
      if(err) reject(err)
      else {
        if(data[0]){
          const query2 = `update portfolio set quantity=quantity+${quantity}, amount=amount+${amount} where id='${data[0].id}'`
          pool.query(query2, (err, data) => {
            if(err) reject(err)
            else resolve(data)
          })
        } 
        else {
          const query3 = `insert into portfolio values(uuid(), '${stockId}', '${userId}', ${quantity}, ${amount})`
          pool.query(query3, (err, data) => {
            if(err) reject(err)
            else resolve(data)
          })
        }
      }
    })
  })
}

exports.getUsersPortfolio = (userId) => {
  return new Promise((resolve,reject) => {
    const query = `select p.id, s.stockname, p.quantity, p.amount from stock s, portfolio p where s.id = p.stockId and p.userId='${userId}'`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}