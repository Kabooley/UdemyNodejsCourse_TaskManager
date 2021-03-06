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

## API Authentication and Security

#### Middleware を使う

**ミドルウェアとは、非同期関数の実行中に制御が渡される関数のことである. スキーマレベルで指定されるとのこと\***

Mongoose には、

- ドキュメントミドルウェア、
- モデルミドルウェア、
- 集約ミドルウェア、
- クエリミドルウェア
  の 4 種類のミドルウェアがあります。

ドキュメントミドルウェア関数では、this がドキュメントを参照するので
this を使用することが前提となる

...という感じに、
とにかく
ミドルウェアという概念は何かといえばある処理の実行中に
その処理とは別の関数に移動して別の処理を施すことである
たとえば記録するとか

で
その別の処理というのが、4 種類ありますよ
度のメソッドがどれに当てはまるかは公式を見るとして

**スキーマとは**
データベースの構造のことである
データベース上のデータはすべて何らかのスキーマに所属する
これはちょうど Windows OS 上のファイルがすべていずれかのディレクトリに属することに似ている
なのでデータベースで何らかのいわゆるテーブルを作成するときにそのデータは何かのスキーマに所属する
SQL データベースではスキーマは所有者や書き込みの権限などの概念を持つ
まさしくディレクトリのようなものであるな
ただしスキーマは階層化させることはできないとのこと

この講義で言えば users と tasks がスキーマであり
users 内の各 JSON ファイルがスキーマに属するファイルである

つまり
ミドルウェアはスキーマ（講義で言えばモデルである Users や Tasks）のメンバ関数であり
Schema.prototype.~な感じに使用するわけである

Mongoose は名称が同じメソッドがいくつもあるので区別に注意
save とか

#### ユーザーログイン認証

スキーマの作成
モデルの作成
パスワードのハッシュ化

ログインするときにありがちな必要な情報は？
email
password

- router
  /users/login のルートでログイン情報を得る

- model
  email, password の

- 認証情報

JASON Web Token

**token とは**
wiki より

複数からなる文字列のこと

**JSON WEB TOKEN**
JSON データ構造で表現されたトークンの使用であるそうです
特徴として
署名、暗号化、URL-safe である

```

```

JWT はピリオドで区切られた３つの文字列からなっており
ヘッダ.ペイロード.書名
と分解できる

- ヘッダ

JWT 署名検証を行うために必要な情報を格納するためのパ-トである
キー・値のペアを Base64URL エンコードした文字列である
要はこれは JWT 型であること
署名アルゴリズムが何であるのか
の情報を格納している

- ペイロード

やり取りする情報

- 署名

署名パートは、エンコード済みヘッダー、ピリオド（"."）、エンコード済みペイロードを連結したものを入力値として"alg"の署名アルゴリズムで署名し、Base64url エンコードすることにより作成されます。

ということで
こいつをヘッダにあるアルゴリズムででコードすれば
署名検証することができ、
その正当性を確認できるということのようです

JWT で生成されたトークンは HTML や HTTP でやり取りしやすいということで
よく用いられている

**そもそも署名とは**

現実世界の署名をデジタル世界で実現したものである
つまりはサインした本人の承認を意味する
あと本人でないと書名が有効とみなせない

デジタル世界ではデータはコピーし放題である
なぜならデジタル情報だから

ということで各署名データはそれがコピーなのか本人の証明したもの本なのか
判断できないよね

ではどうすべきか
電子署名はすべからく対象のデータごとに署名の内容が異なるようになっていないといけない
＆＆
対象データと署名内容が整合していないといけない

ーーー＞署名は次の通りに３つ処理されることになる

- 対象のデータから署名は署名者独自のデータを生成しなくてはならない
  本人だけができないといかん
- 対象のデータと署名の整合性を検証しなくてはならない
  誰にでもできないといかん
- 秘密鍵・公開鍵が必要
  署名鍵・検証鍵

#### ユーザーログイン認証２

どうやってトークンを生成してどうやってトークンをやりとりするか
/users, /users/login
の各ルートでトークンを生成する
model にトークンメンバを追加する
トークン生成時にトークンメンバを保存する

ぶっちゃけ講義ではトークンの認証について同実装すべきかは教えられなかった

#### Express の middleware

```JavaScript
const app = express()
app.use((req, res, next) => {
	console.log('this is middleware')
	next()
})
```
引数が３つでミドルウェアとみなされる

```JavaScript
const middleware = (req, res, next) => {next()}
router.get("/users", middleware, (req, res) => {
})
```
app.get()は引数に複数のcallback関数を取ることができるので
ここにミドルウェアを置くことができる
ミドルウェアはnext()を実行することが前提になるので
最終的なコールバック関数でないコールバック関数は、
next()を使用していればミドルウェアとみなす


