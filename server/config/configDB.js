const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'vasanth',
  database: 'project',
  password: 'vasanthcr7',
})

module.exports.pool = pool;