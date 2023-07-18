// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import "./config/db.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js"; // Import the user controller

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware: Use morgan for logging HTTP requests
app.use(logger("dev"));
app.use(express.json());

// Define your routes here
app.use("/api/users", userRoutes);
// app.use("/api/posts", userRoutes);
// app.use("/api/dms", userRoutes);

// Catch all
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, function () {
  console.log(`Express/MongoDB running on port ${PORT}`);
});
