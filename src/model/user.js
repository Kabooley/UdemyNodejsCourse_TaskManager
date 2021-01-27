const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
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

// MIDDLEWARE
// To bind "this", DON'T USE ARROW FUNCTION
// 
// postmanでCreate Userしたときにミドルウェアとして機能する
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("just before save user");
  console.log(user);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
