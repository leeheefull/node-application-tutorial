/**
 * post route
 *
 * 게시글 API를 사용할 수 있도록 URL과 그에 맞는 메서드를 설정합니다.
 */

module.exports = app => {
    const posts = require("../lib/post/post.controller.js");

    var router = require("express").Router();

    // 게시글 생성
    router.post("/", posts.create);

    // 게시글 전체 찾기
    router.get("/", posts.findAll);

    // 게시글 하나 찾기
    router.get("/:id", posts.findOne);

    // 게시글 수정하기
    router.put("/:id", posts.update);

    // 게시글 하나 지우기
    router.delete("/:id", posts.delete);

    // 게시글 전체 지우기
    router.delete("/", posts.deleteAll);

    app.use('/api/posts', router);
};
