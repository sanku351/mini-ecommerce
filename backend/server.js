import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create PostgreSQL client
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create products table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
    client.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    
    // Validate required fields
    if (!name || typeof price !== 'number' || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const { rows } = await pool.query(
      'INSERT INTO products (name, price, description, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, description, imageUrl || null]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search endpoint (basic keyword matching)
app.get('/api/products/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const { rows } = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 OR description ILIKE $1
       ORDER BY created_at DESC`,
      [`%${query}%`]
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

console.log('Server setup complete. Ready to start listening for requests.');