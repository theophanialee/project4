import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"; // Import the user controller

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Define your routes here
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Express/PG is running on port ${PORT}`);
});
