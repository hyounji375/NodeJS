import express from "express";
import db from "./models/index.js";
import user from "./routes/userRoute.js";
const app = express();

app.set("port", 3000);

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", user);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 서버 실행 중`);
});
