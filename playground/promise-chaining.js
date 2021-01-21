require("../src/db/mongoose");
const User = require("../src/model/user");

<<<<<<< HEAD
// 6001ea51f1f78d1d04320833

User.findByIdAndUpdate("6001ea51f1f78d1d04320833", { age: 1 })
=======
// 探してアップデートする
User.findByIdAndUpdate("6002bcf24c54d22f447e307d", { age: 1 })
>>>>>>> origin/main
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
<<<<<<< HEAD
=======
//   User.countDOcuments()の結果がresultへ
>>>>>>> origin/main
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
