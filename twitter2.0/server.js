// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "morgan";
import "./config/db.js";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import checkToken from "./config/checkToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware: Use morgan for logging HTTP requests
app.use(logger("dev"));
app.use(express.json());
app.use(checkToken);


// Define your routes here
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/dms", dmRoutes);

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
