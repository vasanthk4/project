const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'vasanth',
  database: 'project',
  password: 'Vasanth@1',
})

module.exports.pool = pool;