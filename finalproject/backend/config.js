const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'auto-db.cclk4zrxortg.ap-southeast-1.rds.amazonaws.com',
  // host: 'localhost',
  user: 'admin',
  user: 'admin',
  password: 'xitgmLwmp12q',
  database: '999auto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



module.exports = pool;