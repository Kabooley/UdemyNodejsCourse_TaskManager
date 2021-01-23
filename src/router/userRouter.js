const express = require("express");
const User = require("../model/user");
const router = new express.Router();

// ------------------------------------------------------
// POST
// ------------------------------------------------------

router.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ------------------------------------------------------
// GET
// ------------------------------------------------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
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

// -------------------------------------------------------------
//  PATCH
// -------------------------------------------------------------
//
// update user
//
router.patch("/users/:id", async (req, res) => {
  // 既存のプロパティだけを更新できるように制限をかける
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Error: Invalid updates" });
  }

  const _id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!user) {
      return res.status(404).send("There's no user who has the id");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//--------------------------------------------------------------
// DELETE
//--------------------------------------------------------------

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).res("There's none who has the ID");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
