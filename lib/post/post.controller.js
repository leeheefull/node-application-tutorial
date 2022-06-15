/**
 * post controller
 *
 * post route에 정의한 URL에 대한 메서드를 구현합니다.
 */

const db = require("../db");
const Post = db.posts;

// 게시글 생성
exports.create = (req, res) => {
    // 제목이 비었는 지 체크
    if (!req.body.title) {
        res.status(400).send({
            message: "제목이 없으면 안됩니다!!"
        });
        return;
    }

    // 게시글 생성
    const post = {
        title: req.body.title,
        content: req.body.content
    };

    // DB에 저장
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "게시글 생성 오류 발생!!"
            });
        });
};

// 게시글 전체 찾기
exports.findAll = (req, res) => {
    // DB에서 게시글 가져오기
    Post.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "게시글 전체 찾기 오류 발생!!"
            });
        });
};

// 아이디에 대한 게시글 찾기
exports.findOne = (req, res) => {
    const id = req.params.id;

    // DB에서 게시글 가져오기
    Post.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `id가 ${id}인 게시글을 찾을 수 없습니다.`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "게시글 찾기 오류 발생!!"
            });
        });
};

// 게시글 업데이트 하기
exports.update = (req, res) => {
    const id = req.params.id;

    // DB에서 게시글 업데이트 하기
    Post.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `id가 ${id}인 게시글 수정 완료!!`
                });
            } else {
                res.send({
                    message: `id가 ${id}인 게시글은 수정할 수 없습니다!!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "게시글 수정 오류 발생!!"
            });
        });
};

// 아이디에 대한 게시글 삭제하기
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `id가 ${id}인 게시글 삭제 완료!!`
                });
            } else {
                res.send({
                    message: `id가 ${id}인 게시글을 삭제할 수 없습니다!!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "게시글 삭제 오류 발생!!"
            });
        });
};

// 게시글 전부 삭제하기
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums}개의 게시글 삭제 성공!!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "게시글 전체 삭제 오류 발생!!"
            });
        });
};
