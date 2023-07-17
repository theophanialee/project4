import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3001;

// Define your routes and middleware here

app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.PG_SSL,
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

const getUsers = async (request, response) => {
  const results = await pool.query('SELECT * FROM "user";');
  response.status(200).json(results.rows);
};

app.get("/users", getUsers);

// Start the server
app.listen(PORT, () => {
  console.log(`Express/PG is running on port ${PORT}`);
});

// const express = require("express");
// const path = require("path");
// const favicon = require("serve-favicon");
// const logger = require("morgan");

// require("dotenv").config();
// require("./config/database");

// const moviesRouter = require("./routes/api/moviesRoutes");

// const app = express();

// app.use(logger("dev"));
// app.use(express.json());

// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
// app.use(express.static(path.join(__dirname, "build")));

// app.use(require("./config/checkToken"));

// //__routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/movies", moviesRouter);
// app.use("/api/promotions", require("./routes/api/promotions"));
// app.use("/api/tickets", require("./routes/api/tickets"));
// app.use("/api/seats", require("./routes/api/seats"));
// //__________

// //--catch all
// app.get("/*", (req, res) =>
//   res.sendFile(path.join(__dirname, "build", "index.html"))
// );
// //----------

// const port = process.env.PORT || 3001;

// app.listen(port, function () {
//   console.log(`Express running on port ${port}`);
// });
