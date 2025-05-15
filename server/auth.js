const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const pool = require("./db");

const client = new OAuth2Client();

router.post("/auth/google", async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const { sub, name, email, picture } = payload;

        // Save user to DB if not exists
        const result = await pool.query(
            "INSERT INTO users (google_id, name, email, picture) VALUES ($1, $2, $3, $4) ON CONFLICT (google_id) DO NOTHING RETURNING *",
            [sub, name, email, picture]
        );

        res.json({ success: true, user: payload });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;
