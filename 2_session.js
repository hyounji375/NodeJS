import express from "express";
import session from "express-session";

const app = express();
app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "node-secret",
    //백엔드에서 사용할 키. dotenv로 사용해주는 게 좋다.
    resave: false,
    //세션 값이 똑같으면 다시 저장하지 않음.
    saveUninitialized: false,
    //req 메시지가 들어왔을 때 session에 아무런 작업이 없을 때 저장하지 않음
    //보통은 false. 만약 true면 아무 내용이 없는 session이 계속 저장될 수 있음.
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60000,
    },
  })
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "1234@naver.com" && password === "1111") {
    req.session.member = {
      //member는 어떤 이름으로 세션을 저장할 것이냐
      email,
      password,
    };
    console.log(req.session.member);
    res.status(201).send({ message: "success" });
  } else {
    res.status(403).send({
      message: "fail",
      error: "이메일 혹은 비밀번호가 틀렸습니다.",
    });
  }
});

app.post("/logout", (req, res) => {
  console.log(req.session.member);
  //세션이 삭제되어서 undefined가 뜬다.
  req.session.destroy(() => {
    //세션 안에 있는 데이터 삭제. 부여된 세션 id는 삭제가 안 됨.
    console.log("로그아웃 되었습니다.");
  });
  res.status(200).send({ message: "success" });
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버 실행`);
});
