import Sequelize from "sequelize";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4", //이모티콘이나 이모지 사용 가능
        collage: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "userIdx" });
  }
}
