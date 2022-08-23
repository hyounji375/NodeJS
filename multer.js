import express from "express";
import morgan from "morgan";
import multer from "multer";

import fs from "fs";
import path from "path";

const app = express();

app.set("port", 3000);

app.use(morgan("dev"), express.json(), express.urlencoded({ extended: false }));
//미들웨어 한 번에 적용하기

const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "image")));
//localhost:3000/upload로 접속하면 image 폴더에 접근 가능
app.use("/", express.static(path.join(__dirname, "public")));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "image");
      //done(실패 시 에러, 성공 시 도착할 폴더명)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      //파일명의 확장자명을 가지고 와서 변수화.
      //이렇게 하면 확장자명이 틀렸습니다와 같은 경고를 띄울 수 있다.
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      //확장자명을 제외한 파일명 + 현재 시간 + 확장자명
      //extname(file.originalname) => 확장자명 ex) js
      //basename(file.originalname, ext) => 확장자를 제외한 파일명 ex) multer
      //file.originalname => 원래 파일명 ex) multer.js
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  //파일 용량 제한. 기준은 byte
});
//multer의 저장소 세팅. 업로드 할 파일을 어디에, 어떤 이름으로, 용량 등을 설정한 것.

try {
  fs.readdirSync("image");
} catch (error) {
  fs.mkdirSync("image/");
}
//image 폴더 있어? 없으면 만들어

app.post("/image", upload.single("image"), (req, res) => {
  console.log(req.file);
});
//upload.single("image") 이 순간에 파일이 저장됨.

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 실행 중`);
});
