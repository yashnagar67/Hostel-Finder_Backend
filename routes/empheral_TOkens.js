const express = require("express");
const route = express.Router();

require("dotenv").config();

// Simplified endpoint - returns API key for client-side connection
// NOTE: This is for development only. For production, use a proxy approach.
route.post("/voice/generate-token", async (req, res) => {
    console.log("Voice token generation requested");
    
    try {
        // For now, we'll return the API key
        // In production, you'd want to implement rate limiting and user authentication
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ 
                message: "API key not configured",
                success: false
            });
        }
        
        res.json({ 
            apiKey: process.env.GEMINI_API_KEY,
            success: true,
            note: "Development mode - API key returned directly"
        });

    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ 
            message: "Failed to generate voice token", 
            error: error.message,
            success: false
        });
    }
});

module.exports = route;