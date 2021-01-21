require("../src/db/mongoose");
const Task = require("../src/model/task");

<<<<<<< HEAD
Task.findByIdAndUpdate("6001ea51f1f78d1d04320833", { completed: true })
=======
Task.findByIdAndUpdate("6006b98482cbe02738d8db73", { completed: true })
>>>>>>> origin/main
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
