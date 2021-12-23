const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post: {//제픔명
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      name: {//제픔명
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      img: {//이미지
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      userimg: {//이미지
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
   db.Post.hasMany(db.Post);
  }
};