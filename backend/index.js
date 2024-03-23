const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config({ path: "./.env.local" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const pool = new Pool({
  user: process.env.DB_USER,
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

app.get("/api/games", async (request, response) => {
  try {
    const data = await pool.query('SELECT * FROM game ORDER BY "date"');
    games = data.rows;
    response.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.post("/api/games", async (request, response) => {
  try {
    const game = {
      home_team: request.body.home_team,
      away_team: request.body.away_team,
      date: request.body.date,
    };
    await pool.query(
      "INSERT INTO game (home_team, away_team, date) VALUES ($1, $2, $3)",
      [game.home_team, game.away_team, game.date]
    );
    response.status(201).send();
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.put("/api/scores/:id", async (request, response) => {
  try {
    await pool.query(
      "UPDATE game SET goals_home = $1, goals_away = $2 WHERE id = $3",
      [request.body.goals_home, request.body.goals_away, request.params.id]
    );
    response.status(201).send();
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.post("/api/bets", async (request, response) => {
  try {
    const bet = {
      user_id: request.body.user_id,
      game_id: request.body.game_id,
      goals_home: request.body.goals_home,
      goals_away: request.body.goals_away,
    };
    await pool.query(
      "INSERT INTO bet (user_id, game_id, goals_home, goals_away) VALUES ($1,$2,$3,$4)",
      [bet.user_id, bet.game_id, bet.goals_home, bet.goals_away]
    );
    response.status(201).send();
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.get("/api/bets", async (request, response) => {
  try {
    const data = await pool.query("SELECT * FROM bet");
    bets = data.rows;
    response.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.get("/api/users", async (request, response) => {
  try {
    const data = await pool.query('SELECT * FROM "user" ORDER BY points DESC');
    users = data.rows;
    response.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.post("/api/users", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = {
      username: request.body.username,
      password: hashedPassword,
      points: 0,
    };
    await pool.query(
      'INSERT INTO "user" (username, password, points) VALUES ($1, $2, $3)',
      [user.username, user.password, user.points]
    );
    response.status(201).send(`Successfully added new user - ${user.username}`);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.put("/api/pointsWin", async (request, response) => {
  const username = request.body.username;
  const pointsMultiplied = request.body.multiplier * 1;
  try {
    // Query the database for the user
    const userResult = await pool.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );
    if (userResult.rows.length === 0) {
      return response.status(404).send("User not found");
    }
    const user = userResult.rows[0];

    // Check if user has an id
    if (!user.id) {
      return response.status(404).send("User ID not found");
    }

    // Update the user's points
    await pool.query('UPDATE "user" SET points = points + $2 WHERE id = $1', [
      user.id,
      pointsMultiplied,
    ]);
    response.status(200).send("Points updated successfully.");
  } catch (error) {
    console.error(error);
    response.status(500).send("An error occurred while updating points.");
  }
});

app.put("/api/pointsScore", async (request, response) => {
  const username = request.body.username;
  const pointsMultiplied = request.body.multiplier * 2;
  try {
    // Query the database for the user
    const userResult = await pool.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );
    if (userResult.rows.length === 0) {
      return response.status(404).send("User not found");
    }
    const user = userResult.rows[0];

    // Check if user has an id
    if (!user.id) {
      return response.status(404).send("User ID not found");
    }

    // Update the user's points
    await pool.query('UPDATE "user" SET points = points + $2 WHERE id = $1', [
      user.id,
      pointsMultiplied,
    ]);
    response.status(200).send("Points updated successfully.");
  } catch (error) {
    console.error(error);
    response.status(500).send("An error occurred while updating points.");
  }
});

app.delete("/api/bet/:id", async (request, response) => {
  const bet_id = parseInt(request.params.id, 10); // Ensure the parameter is treated as a number
  try {
    await pool.query("DELETE FROM bet WHERE id=$1", [bet_id]); // Assuming the primary key column is named `id`
    response.status(200).send(`Bet with ID ${bet_id} was deleted.`);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.put("/api/pointsScore", async (request, response) => {
  const user = users.find((user) => user.username == request.body.username);
  try {
    await pool.query('UPDATE "user" SET points=points+2 WHERE id=$1', [
      user.id,
    ]);
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
});

app.post("/api/users/login", async (request, response) => {
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
