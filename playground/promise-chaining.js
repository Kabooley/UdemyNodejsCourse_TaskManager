require("../src/db/mongoose");
const User = require("../src/model/user");

// 探してアップデートする
User.findByIdAndUpdate("6002bcf24c54d22f447e307d", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
//   User.countDOcuments()の結果がresultへ
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
