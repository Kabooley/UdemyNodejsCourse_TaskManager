// CRUD

// 1: 以下3行はまとめられるよ~
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
// この通り
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// ランダム生成ユニークIDの取得
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.toHexString());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database");
    }

    console.log("Connection correclty");

    const db = client.db(databaseName);

    // @ documentを一つだけ挿入する
    db.collection("users").insertOne(
      {
        //   作成したObjectIDをあてがうことができるね
        _id: id,
        name: "Teddy",
        age: 17,
      },
      (error, result) => {
        if (error) {
          console.log("Unable to insert user");
        }
        console.log(result.ops);
      }
    );

    //@ ドキュメントを複数挿入する
    // db.collection("users").insertMany(
    //   [
    //     { name: "Rola", favorite: "Animals" },
    //     { name: "Nagato", charming: "Boob and Butt" },
    //     { name: "Serina", mom: "loves me" },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }

    //     console.log(result.ops);
    //   }
    // );
  }
);
