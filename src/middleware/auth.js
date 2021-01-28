const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
	//   POSTMANのRead usersでgetリクエストを送る
	// headerに{"Authorize": "bearer tokenの文字列"}
	// "bearder "の部分を消す
	const token = req.header("Authorization").replace("Bearer ", "");
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	// 		token: JsonWebTokenの文字列
	// 		secretOrPublickey: secretOrPublicKeyは、HMACアルゴリズムのシークレット、
	// 		またはRSAとECDSAのPEMエンコードされた公開キーのいずれかを含む文字列またはバッファーです。
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
