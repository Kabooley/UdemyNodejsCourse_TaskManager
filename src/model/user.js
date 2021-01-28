const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// jwt.sign(payload, secretOrPrivateKey, [options, callback])
//
// payload: オブジェクトリテラル
// secretOrPublicKey: HMACアルゴリズムのシークレット、
// 	またはRSAとECDSAのPEMエンコード秘密キーのいずれかを含む文字列、バッファー、またはオブジェクト
// 	要は"thisismynewcourse"は秘密鍵である
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  //   新規の配列の生成:  concatは2つ以上の配列を結合するために使用する
  // userの配列の末尾にtokenの配列のメンバが追加されるということ
  // つまりuser.tokensという新規のメンバを作成してその値をtokenにするということ
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // まずe-mailアドレスがあるかの確認
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Schema.prototype.pre()
//
// "save" : Model.prototype.save()の"save"と記述を一致させること
// コールバック関数はthisを使う関係上、アロー関数であってはならない
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
