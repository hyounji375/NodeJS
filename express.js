import express from "express";

const app = express();
//express의 반환값

app.set("port", 3000);
//3000이라는 숫자를 port라는 이름으로 세팅함. 그러면 port 로직을 분리할 수 있다.

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행 중`);
});
//http에서 server.listen 했던 거랑 같음. 서버가 실행된다.
