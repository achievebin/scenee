require('dotenv').config(); //.env 파일
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // React와 연동 위해 필요
app.use(express.json());

const authRoutes = require("./routes/authRoutes.js")
const movieRoutes = require("./routes/movieRoutes.js")
const reviewRoutes = require("./routes/reviewRoutes.js")
const noticeRoutes = require("./routes/noticeRoutes.js")

app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/board", noticeRoutes)

const Port = '5000'

app.listen(Port,()=>{
    console.log(`서버 연결됨${Port}`)
})


// async function testConnection() {
//     try {
//         const conn = await pool.getConnection();
//         console.log("mariaDB 연결 성공");
//         conn.release(); //연결 해제
//     } catch (err) {
//         console.error("mariaDB 연결 실패", err);
//     }
// }
// testConnection();

// async function createTables() {
//     const conn = await pool.getConnection();
//     try {
//         //영화 정보 테이블 생성
//         await conn.query(
//             `CREATE TABLE Movie (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             movieCd VARCHAR(20) UNIQUE,
//             movieNm VARCHAR(255),
//             openDt DATE,
//             genreNm VARCHAR(100),
//             directors TEXT,
//             actors TEXT,
//             showTm INT,
//             watchGradeNm VARCHAR(100),
//             rank INT,
//             salesAcc BIGINT,
//             audiAcc BIGINT
//             );`
//         )
//     } catch {

//     }
// }
// createTables();