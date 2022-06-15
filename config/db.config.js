/**
 * DB 설정 파일
 *
 * MySQL 설정 데이터 구성합니다.
 */

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "tutorial",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
