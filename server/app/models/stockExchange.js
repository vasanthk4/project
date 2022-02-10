const {pool} = require('../../config/configDB');

module.exports.createStockExchangeTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists stockExchange(" + 
    "id varchar(255) primary key," +
    "amount float(10,2)," +
    "quantity int," +
    "userId varchar(255)," +
    "stockId varchar(255)," + 
    "exchangeType varchar(10)," +
    "date  datetime default now()," + 
    "foreign key (userId) references user(id) on delete cascade," +
    "foreign key (stockId) references stock(id) on delete cascade" +
    ")"
    localPool.query(query, (err, data) => {
      if(err) reject(err)
      else {
        console.log("Stock Exchange Table Created!")
        resolve(data)
      }
    })
  })
}

module.exports.exchangeStock = ({stockId, userId, amount, quantity, exchangeType}) => {
  return new Promise((resolve, reject) => {
    const query = `insert into stockExchange(id, amount, quantity, userId, stockId, exchangeType) values(uuid(), ${amount}, ${quantity}, '${userId}', '${stockId}', '${exchangeType}')`
    pool.query(query, (err, data) => {
      if(err)
        reject(err)
      else 
        resolve(data)
    })
  })
}

module.exports.getExchangeHistory = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select e.id, s.stockname, e.quantity, e.amount, e.date, e.exchangeType from stock s, stockExchange e where e.userId='${id}' and e.stockId=s.id order by e.date desc`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}