import pool from "../config/db.js";

const getUsers = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM "user";');
    response.status(200).json(results.rows);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers };
