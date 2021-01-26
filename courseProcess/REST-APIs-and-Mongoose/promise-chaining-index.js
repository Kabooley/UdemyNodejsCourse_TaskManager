const express = require("express");
const User = require("./model/user");
const Task = require("./model/task");
// begin to use mongoose , you need to include this file.
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ------------------------------------------------------
// POST
// ------------------------------------------------------
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  newUser
    .save()
    .then(() => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
  // It might be an empty object...
  console.log(req.body);
  const { description, completed } = req.body;
  const newTask = new Task({ description, completed });
  newTask
    .save()
    .then(() => {
      res.status(201).send(newTask);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// ------------------------------------------------------
// GET
// ------------------------------------------------------
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  console.log(req.params);
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
