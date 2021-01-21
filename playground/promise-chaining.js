require("../src/db/mongoose");
const User = require("../src/model/user");

// 探してアップデートする
// User.findByIdAndUpdate("6002bcf24c54d22f447e307d", { age: 17 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 17 });
//   })
//   //   User.countDOcuments()の結果がresultへ
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updatedAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updatedAgeAndCount("6001df53b429c632fc7a3740", 11)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
