/**
 * post controller
 *
 * post route에 정의한 URL에 대한 메서드를 구현합니다.
 */

const db = require("../db");
const Post = db.posts;
const Op = db.Sequelize.Op;

// 게시글 생성
exports.create = (req, res) => {
    // 제목이 비었는 지 체크
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
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
                    err.message || "게시글 작성 오류!!"
            });
        });
};

// 게시글 전체 찾기
exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    // DB에서 게시글 가져오기
    Post.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "게시글 찾기 오류!!"
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
                    message: `=${id}.`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: `id가 ${id}인 게시글은 없습니다.`
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
            if (num === 1) {
                res.send({
                    message: "게시글 업데이트 완료!!"
                });
            } else {
                res.send({
                    message: `아이디가 ${id}인 게시글은 업데이트할 수 없습니다!!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "게시글 업데이트 오류 발생!!"
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
            if (num === 1) {
                res.send({
                    message: "게시글 삭제 완료!!"
                });
            } else {
                res.send({
                    message: `아이디가 ${id}인 게시글을 삭제할 수 없습니다!!`
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
            res.send({message: `${nums}개의 게시글 삭제 성공!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "게시글 삭제 오류 발생!!"
            });
        });
};
