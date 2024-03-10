const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

(async () => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query("SELECT current_user");
    const currentUser = rows[0]["current_user"];
    console.log(`connected with postgreSQL as ${currentUser}`);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
})();

app.use(express.json());

let users = [];

app.get("/users", async (request, response) => {
  try {
    const data = await pool.query('SELECT * FROM "user"');
    users = data.rows;
    response.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.post("/users", async (request, response) => {
  if (users.find((user) => user.username == request.body.username)) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      const user = {
        username: request.body.username,
        password: hashedPassword,
      };
      await pool.query(
        'INSERT INTO "user" (username, password) VALUES ($1, $2)',
        [user.username, user.password]
      );
      response
        .status(201)
        .send(`Successfully added new user - ${user.username}`);
    } catch (error) {
      console.error(error);
      response.status(500).send();
    }
  } else {
    alert("Account with this username already exists");
  }
});

app.post("/users/login", async (request, response) => {
  const user = users.find((user) => user.username == request.body.username);

  if (user == null)
    return response
      .status(400)
      .send("There is no user with provided username in the database");

  try {
    if (await bcrypt.compare(request.body.password, user.password)) {
      response.json(user);
    } else {
      response.error("Wrong Password");
    }
  } catch {
    response.status(500).send();
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
