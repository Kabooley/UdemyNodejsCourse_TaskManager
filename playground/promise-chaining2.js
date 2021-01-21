require("../src/db/mongoose");
const Task = require("../src/model/task");

// Task.findByIdAndUpdate("6006b98482cbe02738d8db73", { completed: true })
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: true });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updatedCompletedAndCount = async (id, completed) => {
  const task = await Task.findByIdAndUpdate(id, { completed });
  const result = await Task.countDocuments(id);
  return result;
};

updatedCompletedAndCount("6001e1f4c99c2335d8e7f13e", true)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
