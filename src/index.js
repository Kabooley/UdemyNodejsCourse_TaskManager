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

//
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);

  try {
    await newTask.save();
    res.send(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ------------------------------------------------------
// GET
// ------------------------------------------------------
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
