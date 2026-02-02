import express from 'express';
// Use the new package name
import { createClient } from '@google/genai';

const route = express.Router();

// The new SDK uses a different initialization pattern
const client = createClient({
  apiKey: process.env.GEMINI_API_KEY,
  // CRITICAL: You must specify v1alpha to use ephemeral tokens
  httpOptions: { apiVersion: 'v1alpha' }
});

route.post("/voice/generate-token", async (req, res) => {
    console.log("Voice token generation requested");
    try {
        // Correct method: client.authTokens.create
        const tokenResponse = await client.authTokens.create({
            config: {
                uses: 1,
                // The new SDK handles dates easily
                expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString()
            }
        });

        // The token itself is in the .name field of the response
        res.json({
            token: tokenResponse.name,
            expiresAt: tokenResponse.expireTime
        });
    } catch (error) {
        console.error('Token generation failed:', error);
        res.status(500).json({
            error: 'Failed to generate live session token',
            details: error.message
        });
    }
});

export default route;
