const express = require("express");
const Task = require("../model/task");
const router = express.Router();

// ------------------------------------------------------
// POST
// ------------------------------------------------------

router.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);

  try {
    await newTask.save();
    res.send(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ------------------------------------------------------
// GET
// ------------------------------------------------------

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
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

// -------------------------------------------------------------
//  PATCH
// -------------------------------------------------------------
//
// update user
//

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  //
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isInvalidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isInvalidOperation) {
    return res.status(400).send({ error: "Error: Invalid updates" });
  }
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!task) {
      return res.status(404).send("There's no task who has the id");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//--------------------------------------------------------------
// DELETE
//--------------------------------------------------------------

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).res("There's none who has the ID");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
