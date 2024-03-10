const express = require("express");
const app = express();

app.use(express.json());

const users = [];

app.get("/users", (request, response) => {
  response.json(users);
});

app.post("/users", (request, response) => {
  const user = {
    username: request.body.username,
    password: request.body.password,
  };

  users.push(user);
  response.json(user);
  response.status(201);
});

app.listen(3000);
