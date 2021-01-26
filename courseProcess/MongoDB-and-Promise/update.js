// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

// const connectionURL = 'mongodb://127.0.0.1:27017'
const connectionURL = "mongodb://localhost:27017";

const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    // updateOne():
    // 条件に一番初めにヒットしたデータひとつだけをアップデートする
    // 複数同条件のデータがあってもupdateOneでは無視される
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("600184f4ce8ebd2a3ca088cb"),
        },
        {
          $set: {
            charming: "voice and face",
            hair: "long",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //   update all documents that match the specified filter for a collection
    // 条件にヒットしたすべてのデータをアップデートする
    db.collection("users")
      .updateMany(
        { name: "Serina" },
        {
          $set: {
            shape: "Beautiful slender",
            boobs: "Not big but bouncy",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
); //   End MongoClient.connect()

/**
 * operator
 * https://docs.mongodb.com/manual/reference/operator/update/
 * updateMany
 * https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/
 *
 *
 */
