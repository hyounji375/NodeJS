import bcrypt from "bcrypt";
import User from "../models/user.js";
import passport from "passport";

class UserService {
  static async signUp(req, res, next) {
    try {
      console.log(req.body);

      const exUser = await User.findOne({
        //findOne은 최상단 데이터 하나만 검색해서 가져오는 것.
        //반대로 findAll은 검색된 데이터를 배열 형태로 모두 다 가져온다.
        where: {
          email: req.body.email,
        },
      });
      if (exUser) {
        return res.status(403).send("이미 사용 중인 이메일입니다.");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      //12는 보안 단계 높을수록 보안이 좋지만 트래픽이나 그런 게 무거워짐. 보통은 8~12로 함.
      //단방향 암호화. 복호화가 안 되므로 비밀번호가 뭔지 알 수 없다.

      await User.create({
        email: req.body.email,
        //첫 번째 email은 내가 만든 컬럼명
        password: hashedPassword,
      });
      // 데이터 저장
      res.status(200).send("ok");
    } catch (err) {
      console.log(err);
      next(err); //에러를 처리할 수 있는 곳으로 넘김. 이렇게 하면 error가 나도 프로그램이 정지하지 않음.
    }
  }
  static async login(req, res, next) {
    passport.authenticate("local", (err, user, message) => {
      //local을 실행 혹은 로그인이 되는지 안 되는지 인증하겠다.
      if (err) {
        console.error(err);
        return next(err);
      }
      if (message) {
        return res.status(401).send(message);
      }
      return req.login(user, async (loginErr) => {
        //req.login은 passport 내 함수
        if (loginErr) {
          console.error(err);
          return next(err);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: { exclude: ["password"] },
          //password는 제외하고 가져옴
        });
        return res.status(200).json(fullUser);
      });
    })(req, res, next);
    //인증 로직. 내가 등록한 local 로그인 전략을 인증
    //message는 아까 받았던 에러들에 대한 내용. 즉 비밀번호가 올바르지 않다. 가입된 이메일이 아니다.
    //끝에 (req, res, next) 이걸 붙여야 이 값들이 passport.authenticate로 전달된다.
  }
}
export default UserService;

//next는 에러 처리하는 거.
