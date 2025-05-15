const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Set to { rejectUnauthorized: false } if using remote DB with SSL
});

module.exports = pool;
