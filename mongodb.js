// CRUD

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database");
    }

    console.log("Connection correclty");

    const db = client.db(databaseName);

	// --- find document ---
	// 
    // 条件：{name: 'Rola'}
    // 複数候補ある場合、一番idが古いやつがヒットした
    db.collection("users").findOne({ name: "Rola" }, (error, user) => {
      if (error) {
        return console.log("Unable to fetch");
      }
      console.log(user);
	});
	
	// _idで探す場合
    db.collection("users").findOne(
      { _id: new ObjectID("60008a717a90d41d3c28f4e8") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );
  }
);
