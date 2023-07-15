const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Define your routes and middleware here

app.use(express.json());
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "pha.randomacc",
  host: "ep-calm-star-142882.ap-southeast-1.aws.neon.tech",
  database: "music",
  password: "RlTh8IXfC1ds",
  port: 5432,
  ssl: true,
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

const getBands = async (request, response) => {
  const results = await pool.query("SELECT * FROM bands");
  response.status(200).json(results.rows);
};

app.get("/bands2", getBands);

// Start the server
app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
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
