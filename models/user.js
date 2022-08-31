//테이블 정리. 어떤 테이블을 만들건지 어떤 필드가 존재하는지 정리

import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        //user_idx는 auto increment로 알아서 만들어준다.
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          comment: "이메일",
        },
        password: {
          type: Sequelize.STRING(200),
          //복호화되지 않는 단방향 암호가 저장됨.
          allowNull: false,
          comment: "비밀번호",
        },
      },
      {
        sequelize,
        timestamps: true,
        //updateAt과 createdAt을 만들어 줘서 회원가입한 날짜가 자동으로 저장.
        modelName: "User",
        //웬만하면 class 이름과 맞춰주는 게 좋다.
        tableName: "users",
        //실제로 DB에 저장될 테이블명
        charset: "utf8",
        //언어 설정
        collage: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //관계 설정
  }
}
//User는 Sequelize의 Model를 상속받은 것
