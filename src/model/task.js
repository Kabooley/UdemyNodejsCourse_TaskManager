const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

taskSchema.pre("save", function (next) {
  const task = this;
  if (task.isModified("description")) {
    console.log(task.description);
  }
  next();
});
// スキーマがモデルとして登録される
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
