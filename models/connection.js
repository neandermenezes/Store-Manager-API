const myqsl = require('mysql2/promise');
require('dotenv').config();

const connection = myqsl.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // port: process.env.MYSQL_PORT,
});

module.exports = connection;
