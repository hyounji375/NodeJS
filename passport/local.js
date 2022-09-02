//로그인 전략을 짜는 곳

import passport from "passport";
import passportLocal from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

const passportConfig = {
  usernameField: "email",
  //DB에 설정되어 있는 이름 혹은 백엔드에서 받아올 이름으로 해야 함.
  passwordField: "password",
};

const passportVerify = async (email, password, done) => {
  //위의 config에 있는 usernameField, passwordField 값과 동일하게 email, password라고 써줘야 함.
  //done를 성공했으면 index.js로 보내고 실패하면 로그인 로직으로 다시 보냄
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, {
        message: "failure",
        error: "가입된 이메일이 없습니다.",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    //bcrypt라서 비교만 가능. 비교할 두 개의 비밀번호(사용자가 입력한 비번, DB에 있는 비번)
    if (result) {
      return done(null, user);
      //index.js에 user가 전송됨
    } else {
      return done(null, false, {
        message: "failure",
        error: "비밀번호가 올바르지 않습니다.",
      });
    }
  } catch (err) {
    console.log(err);
    return done(err);
  }
};

export default () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
};
