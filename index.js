require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontendhome')));

// Serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontendhome/index.html'));
});


app.post('/submit-feedback', async (req, res) => {
  const { name, message } = req.body;
  try {
    await pool.query('INSERT INTO feedback(name, message) VALUES ($1, $2)', [name, message]);
    res.status(200).json({ message: 'Feedback stored' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
})


app.get('/api/feedbacks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




