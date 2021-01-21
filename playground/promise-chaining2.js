require("../src/db/mongoose");
const Task = require("../src/model/task");

Task.findByIdAndUpdate("6006b98482cbe02738d8db73", { completed: true })
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
