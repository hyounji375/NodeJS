import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.set("port", 3000);

app.use(cookieParser("secret"));
//cookieParser를 사용해야 res.cookie가 가능

app.post("/setcookie", (req, res, next) => {
  try {
    res.cookie(
      "tokenname",
      //tokenname은 쿠키 이름.
      //쿠키 이름을 정해주고 쿠키에 객체를 담음.
      {
        token: "token",

        expired: 5 * 60000,
        //프론트엔드한테도 알려주는 것
      },
      {
        maxAge: 5 * 60000,
        //생명 주기 5분

        // httpOnly: true,
        // http 통신으로만 사용할 수 있다. 웹 서버를 통해서만 사용 가능.
        // secure: true,
        // https에서만 사용이 가능
        // signed: true,
        // 인증된 쿠키만 가지고 올 수 있다. 암호화 된 쿠키. 가지고 오는 방법은 res.send(req.signedCookies);
        //cookieParser("secret") 안에 암호화 키 등록(secret)
      }
    );

    res.send({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
    //next() 괄호 안에 에러를 넣으면 에러 핸들링, 빈 공간이면 다음 미들웨어를 실행하라는 뜻.
  }
});

app.get("/showcookie", (req, res) => {
  res.send(req.cookies);
});

app.post("/clearcookie", (req, res) => {
  res.clearCookie("tokenname");
  res.send({ message: "success" });
});
//쿠키 삭제.
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 실행 중`);
});
