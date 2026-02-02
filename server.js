const express = require("express");
const mongoose = require("mongoose");
const aiRouter = require("./routes/aiRoutes");
const cors = require("cors");
const hostelRoutes = require("./routes/hostelRoutes");
const AIchatbot=require("./routes/AIchatbot")
// const VivaAi=require("./routes/empheral_TOkens").default
require("dotenv").config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 1000;
const MONGO_URI = process.env.MONGOURI || "mongodb://localhost:27017/HostelFinder";
const NODE_ENV = process.env.NODE_ENV || "development";

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✓ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://vivabot.in','https://www.vivabot.in/',
      'https://yashnagarkota.in','https://www.yashnagarkota.in/'
    ],
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/hostels", hostelRoutes);
app.use("/api/ai", aiRouter);
app.use("/api/chat", AIchatbot);
// app.use("/api/vivaai/",VivaAi)
// Root Route
app.use("/", (req, res) => {
  res.json({
    message: "Hostel Finder API",
    version: "1.0.0",
    status: "Running",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start Server
app.listen(3000, () => {
  console.log(`✓ Server running on port $ (${NODE_ENV} mode)`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server gracefully");
  process.exit(0);
});