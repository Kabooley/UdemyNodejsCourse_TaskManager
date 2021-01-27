const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

const app = express();
const port = process.env.PORT || 3000;

// ROUTER
// https://expressjs.com/ja/guide/routing.html
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});
