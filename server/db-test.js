require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ Connected:', res.rows[0]);
    } catch (err) {
        console.error('❌ DB connection error:', err.message);
    } finally {
        await pool.end();
    }
})();
