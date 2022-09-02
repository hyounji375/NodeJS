//세션을 받아오고 해석한 뒤 req.user라는 일종의 데이터 공간에 유저 정보를 자동으로 저장.

import passport from "passport";
import local from "./local.js";
import User from "../models/user.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    //user.id 값이 세션으로 전달되어서 세션이 생긴다.
  });
  passport.deserializeUser(async (id, done) => {
    //세션 데이터 해석 후 user 정보를 req.user에 담는 역할
    try {
      const user = await User.findOne({ where: { id } });
      //User는 테이블을 가져온 것
      done(null, user);
      //null은 에러 핸들링하는 내용. 핸들링하지 않을 거라서 null.
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  local();
};
