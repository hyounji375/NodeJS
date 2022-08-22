import express from "express";
import post from "./routers/post.js";
import comment from "./routers/comment.js";
import user from "./routers/user.js";

const app = express();
app.set("port", 3000);

app.use("/post", post);
app.use("/comment", comment);
app.use("/user", user);
//("/기본 경로명", 내가 만든 router)
//router에서 / 이렇게 줬던 주소가 /post로 되는 것. 그래서 각 컴포넌트의 기본 경로가 겹치지 않게 됨.

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 실행 중입니다.`);
});
