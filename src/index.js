const express = require("express");
const User = require("./model/user");
const user = require("./model/user");

const app = express();
const port = process.env.PORT || 3000;

const userValidator = (data) => {
  const { name, email, password } = data;
  const newUser = new User({
    name,
    email,
    password,
  });
  newUser
    .save()
    .then(() => {
      console.log("User data has validated");
      console.log(newUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

app.use(express.json());

app.post("/users", (req, res) => {
  // ここで取得できてるので
  console.log(req.body);
  res.send("testing");
});

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
