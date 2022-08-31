import dotenv from "dotenv";
//const dotenv = require('dotenv'); 같은 말이다.

dotenv.config();
//나는 이 폴더에서 dotenv를 사용할거야

export default {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    //DB_PASSWORD는 .env에 있는 비밀번호.
    //process는 nodeJS에서 지원하는 env 파일을 읽어주는 역할
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    //로컬호스트. IP 주소.
    port: "3306",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
  //테스트용 db
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
  //배포용 db
};
