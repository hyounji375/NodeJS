//미들웨어 설정, 서버 설정을 하기 위해 app.js를 뺀 것

import express from "express";
import db from "./models/index.js";
import user from "./routes/user.js";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passport/index.js";

const app = express();
app.set("port", 3000);

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결에 성공했습니다.");
  })
  .catch((err) => console.log(err));

passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "node-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", user);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 서버 실행 중`);
});
