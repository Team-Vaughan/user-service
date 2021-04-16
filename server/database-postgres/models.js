const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

require('dotenv').config();

const db = new Sequelize({
  dialect: 'postgres',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  logging: false
});

const User = db.define('user', {
  userId: {
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  bio: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  joinDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  avatarUrl: {
    allowNull: false,
    type: DataTypes.STRING
  },
  isSuperhost: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  identityVerified: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  responseRate: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  responseTime: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

const Language = db.define('language', {
  languageId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  }
});

const UserLanguage = db.define('user_language', {})

UserLanguage.belongsTo(User);
UserLanguage.belongsTo(Language);

const sync = () => {
  return db.sync({ force: true });
}

module.exports = {
  db,
  User,
  Language,
  UserLanguage,
  sync
}