const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');

//const Couple = require('./couple');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);


db.User = User;


Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 연결 객체 활용
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;