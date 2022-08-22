import express from "express";
import morgan from "morgan";
import path from "path";

const app = express();
//express 반환값을 app에 저장

app.set("port", 3000);
//포트를 3000번으로 설정

app.use(morgan("combined"));
//로그를 찍어주는 미들웨어 morgan. 개발용은 dev, 배포용은 combined.

app.use(express.json());
//json 데이터 허용. 허용해주지 않으면 body에 있는 데이터를 읽지 못함.
app.use(express.urlencoded({ extended: false }));
//url에 있는 정보를 express에 내장되어 있는 해석툴(body-parser)로 해석.
//false가 아니라 true면 외부 해석툴 사용

const __dirname = path.resolve();
app.use("/jh", express.static(path.join(__dirname, "public")));
//express.static으로 정적인 파일에 접근할 수 있게 해줌.
//(__dirname, "public") => __dirname으로 기본 경로를 public으로 지정해줌. public 폴더에 접근이 가능해짐.
//public 폴더에 접근할 수 있게 되어서 주소창에 localhost:3000/jh/body.html을 치면 그 파일이 화면에 뜬다.

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버 실행 중`);
});

app.get("/", (req, res) => {
  res.send("우자 게임 졌다.");
});
