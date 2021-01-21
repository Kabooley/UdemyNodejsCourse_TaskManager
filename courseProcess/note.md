## RESTful API

Reresentational State Transfer
ソフトウェアアーキテクチャの設計の一連の「制約」であるとのこと
この制約に従って作成されたシステムは RESTful と評されるとのこと

REST の基本的な考え方は、リソース、たとえば文書が、明確かつ標準化された操作と形式をもって、その状態と関係 (ハイパーテキスト) とともに転送されるというものです。多くの場合、他の場所で何らかの操作をせずに API やサービスを呼び出すことができることが RESTful と呼ばれます。

#### POSTMAN

ユーザ登録を求められている様で、実は以下の URL からダウンロードできる臭い
https://www.postman.com/downloads/

試しに weather-app でデプロイした heroku のエンドポイントにアクセスする

#### HTTP STATUS

#### Mongoose.prototype.connect()

https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect

[options.useFindAndModify=true] «Boolean» True by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().

ということで
useFIndAndModify はデフォルトで true に設定されている
これがセットされていると
findByIdAndUpdate を使ったりしているときに非推奨ですというエラーというか渓谷っぽいのが出る

「Mongoose の findOneAndUpdate（）は、MongoDB ドライバーの findOneAndUpdate（）関数よりもずっと前のものであるため、代わりに MongoDB ドライバーの findAndModify（）関数を使用します。 useFindAndModify グローバルオプションを使用して、MongoDB ドライバーの findOneAndUpdate（）関数の使用をオプトインできます。
」
ということらしい

こいつを false にすることで非推奨の警告に対処できる

### Async/Await

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

Promise は構成したり理解したりするのにやや複雑であるため、モダンブラウザは async 関数と await 演算子を実装しています。前者は通常の関数が promise によって暗黙に非同期的に振る舞うことを可能にし、後者は async 関数内で処理が進む前に promise を待つことで、promise の連鎖を簡単にします。
...とのこと

ということで
async function でこの一見同期関数は非同期に振る舞わせることができる
await をつけると Promise オブジェクトが返されるまで待機するようになる

async 関数は自身のなかで await を使用されるのを知っている関数である
async 関数は Promise を返す
