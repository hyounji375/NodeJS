import Sequelize from "sequelize";
import user from "./user.js";
import config from "../config/config.js";

const env = process.env.NOED_ENV || "development";
//크로스엔브를 사용해서 명령어에 NOED_ENV 값을 넣어주는데 크로스엔브 사용을 안 해서
//지금은 process.env.NOED_ENV 값이 없어서 development가 들어감.
//development는 config.js의 db 설정값

const dbconfig = config[env];
//이 config에 development가 전달되고 전달된 development의 db 설정값이 dbconfig에 저장.

const db = {};

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.password,
  dbconfig
);

db.User = user;
//db의 User라는 객체에 import 한 user를 담겠다.

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
