const express = require('express');
const app = express();
const dotenv = require("dotenv")      // require("dotenv").config(); 로 만들어도 실행됨. 이게 정규문서에서 나오는 실행법임
dotenv.config();

const port = process.env.mallPort;
const connect = require("./schemas/index.js");
connect();

const cartsRouter = require("./routes/carts.js");
const goodsRouter = require('./routes/good.js')
/* routes 폴더의 goods.js 파일을 반환받음. 
   이는 goods.js 파일 마지막에 있는 module.exports = router; 코드가 있기에 가능 */

// app.use() >> 전역 미들웨어.

app.use(express.json())
/*request 객체 안에 있는 body 를 사용하기 위해서 작성한 미들웨어
  body-parser Middleware 를 쓰기 위한 문법*/

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('기본 URI에 POST 메소드가 정상적으로 실행되었습니다.');
});

app.get('/', (req, res) => {
  console.log(req.query)
  const obj = {
    "key111" : "value112233",
    "ketat" : "aassddss"
  }
  res.status(200).json(obj)
  // res.send('정상적으로 반환되었습니다.');
});

app.get('/:id', (req, res) => {
  console.log(req.params)
  res.send(':id URI 가 정상적으로 반환되었습니다');
});

app.use("/api", [goodsRouter, cartsRouter]) // /api 경로가 추가된 경우 goodsRouter를 거쳐라.

app.get('/', (req, res) => { // express() 객체 안에 있는 get 을 사용하기 때문에 별도로 router를 설정할 필요 없음.
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`${port} 포트 서버 오픈!`);
});