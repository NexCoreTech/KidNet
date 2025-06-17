const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-d18arabuibrs73duuhl0-a.virginia-postgres.render.com/kidnet',
  port: 5432,
  user: 'netkid',
  password: 'GNw62r5XeHvEHK70gaUXOD8iU8BLX5Kn',
  database: 'kidnet',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;