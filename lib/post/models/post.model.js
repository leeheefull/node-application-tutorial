/**
 * post entity
 *
 * 게시글의 테이블 구조를 설정할 수 있습니다.
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }
    });
};
