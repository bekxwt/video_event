// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Disable SSL for local dev
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Health check
app.get('/api/health', (_req, res) => res.send({ status: 'OK' }));

// Google auth endpoint
app.post('/api/auth/google', async (req, res) => {
    const { id_token } = req.body;
    if (!id_token) return res.status(400).json({ error: 'No token provided' });

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { sub: googleId, name, email, picture } = ticket.getPayload();

        // Upsert user into Postgres
        const { rows } = await pool.query(
            `INSERT INTO users (google_id, name, email, picture)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (google_id) DO UPDATE
         SET name = EXCLUDED.name,
             email = EXCLUDED.email,
             picture = EXCLUDED.picture,
             updated_at = NOW()
       RETURNING id, google_id AS "googleId", name, email, picture;`,
            [googleId, name, email, picture]
        );
        const user = rows[0];

        // (Optional) issue your own JWT/session here

        res.json({ message: 'User saved', user });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(401).json({ error: 'Invalid ID token' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️ Server listening on port ${PORT}`));
