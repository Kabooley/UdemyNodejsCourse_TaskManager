const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
  },
});

const me = new User({
  name: "   Andrew  ",
  age: 27,
  email: "MYEMAIL@MEAD.IO   ",
  password: "passis123",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

const Task = mongoose.model("Task", {
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

// モデルの定義

const mytask = new Task({
  description: "   Surf to find some nice 80's music",
});
mytask
  .save()
  .then(() => {
    console.log(mytask);
  })
  .catch((error) => {
    console.log(error);
  });
