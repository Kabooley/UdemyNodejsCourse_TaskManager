require("../src/db/mongoose");
const User = require("../src/model/user");

// 6001ea51f1f78d1d04320833

User.findByIdAndUpdate("6001ea51f1f78d1d04320833", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
