/**
 * 실행 파일: express web server
 */

const express = require("express");
const app = express();

// CORS option
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 테이블 DDL
const db = require("./lib/db");
db.sequelize.sync();

// 테이블 전체 삭제
db.sequelize.sync({force: true});

// health check
app.get("/", (req, res) => {
    res.json({message: "신나는 익스프레스 시작!!"});
});

require("./routes/post.route")(app);

// 포트 설정
const PORT = process.env.PORT || 8080;
app.listen(PORT);
