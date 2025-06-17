const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/kidnetdb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/', (req, res) => {
  res.send('KidNet backend is running!');
});

app.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT version()');
    res.json({ postgres_version: result.rows[0].version });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});