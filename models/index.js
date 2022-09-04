import Sequelize from "sequelize";
import user from "./user.js";
import config from "../config/config.js";
import post from "./post.js";

const env = process.env.NOED_ENV || "development";
//NOED_ENV가 없으면 자동으로 development가 들어감.

const dbconfig = config[env];
//development가 env에 전달되고 이게 dbconfig에 저장

const db = {};

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.password,
  dbconfig
);

db.User = user;
//import 해온 user
db.Post = post;

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
