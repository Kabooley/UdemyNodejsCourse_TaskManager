const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// モデルの定義

const Tasks = mongoose.model("Tasks", {
  description: { type: String },
  completed: { type: Boolean },
});

const mytask = new Tasks({
  description: "Surf to find some nice 80's music",
  completed: false,
});
mytask
  .save()
  .then(() => {
    console.log(mytask);
  })
  .catch((error) => {
    console.log(error);
  });
