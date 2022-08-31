import bcrypt from "bcrypt";
import User from "../models/user.js";
class UserService {
  static async signUp(req, res, next) {
    try {
      console.log(req.body);
      const exUser = await User.findOne({
        //findOne는 데이터가 아무리 많더라도 최상단의 데이터 하나만 가지고 온다.
        //findAll은 해당하는 데이터를 다 가져온다.
        where: {
          email: req.body.email,
        },
        //입력한 이메일이 User 테이블에 있는지 찾고
      });
      if (exUser) {
        return res.status(403).send("이미 사용 중인 이메일입니다.");
      }
      //만약에 exUser(테이블에서 찾은 이메일)가 있으면 리턴값 반환

      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      //비밀번호의 단방향 암호화. 암호를 hash값으로 바꾼다. 복호화 할 수 없고 비교만 가능.
      //12는 어느 정도의 난이도로 hash를 반복시켜서 암호화할 것인지 의미하는 보안 단계
      //보안 단계가 높을수록 보안성은 뛰어나지만 속도가 느려지고 트래픽이 무거워진다.
      //보통은 8 ~ 12를 사용.
      await User.create({
        email: req.body.email,
        password: hashedPassword,
        //첫 번째 email은 반드시 필드명과 일치해야 한다.
      });
      res.status(200).send("ok");
      //데이터 저장
    } catch (err) {
      console.error(err);
      next(err);
      //에러를 처리할 수 있는 곳으로 보냄.
    }
  }
}

export default UserService;
