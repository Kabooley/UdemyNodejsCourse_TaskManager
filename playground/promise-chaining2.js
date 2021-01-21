require("../src/db/mongoose");
const Task = require("../src/model/task");

Task.findByIdAndUpdate("6001ea51f1f78d1d04320833", { completed: true })
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: true });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
