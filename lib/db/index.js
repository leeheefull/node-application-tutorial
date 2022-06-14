/**
 * sequelize 초기화
 *
 * db 설정 파일인 "config/db.config.js"의 정보를 기반으로
 * ORM인 Sequelize를 사용할 수 있도록 세팅합니다.
 */

const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("../post/models/post.model.js")(sequelize, Sequelize);

module.exports = db;
