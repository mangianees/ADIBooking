// utils/Modules/ADIModules.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
// console.log(user,host)
const signUpADI = (req, res) => {
  const { firstName, lastName, location } = req.body;
  pool.query(
    "INSERT INTO ADIs (first_name, last_name, location) VALUES ($1, $2, $3) RETURNING aid",
    [firstName, lastName, location],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        res.status(500).send("Error executing query");
        return;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].aid}`);
    }
  );
};

const getADIs = (req, res) => {
  pool.query(
    "SELECT first_name, last_name, location FROM ADIs",
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        res.status(500).send("Error executing query");
        return;
      }
      if (!results.rows) {
        res.status(404).send("No data found");
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getAvailability = (req, res) => {
  pool.query(
    "SELECT * FROM availability",
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        res.status(500).send("Error executing query");
        return;
      }
      if (!results.rows) {
        res.status(404).send("No data found");
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = { getADIs, signUpADI, getAvailability };
