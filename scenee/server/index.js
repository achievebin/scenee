require('dotenv').config(); //.env 파일
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
app.use(cors()); // React와 연동 위해 필요
app.use(express.json());

//MariaDB 연결 풀 설정
const pool = mariadb.createPool({
  host: process.env.DB_Host,
  user: process.env.DB_Username,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  connectionLimit: 5,
  port: process.env.DB_Port
});

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log("mariaDB 연결 성공");
        conn.release(); //연결 해제
    } catch (err) {
        console.error("mariaDB 연결 실패", err);
    }
}
testConnection();

async function createTables() {
    const conn = await pool.getConnection();
    try {
        //영화 정보 테이블 생성
        await conn.query(
            `CREATE TABLE Movie (
            id INT AUTO_INCREMENT PRIMARY KEY,
            movieCd VARCHAR(20) UNIQUE,
            movieNm VARCHAR(255),
            openDt DATE,
            genreNm VARCHAR(100),
            directors TEXT,
            actors TEXT,
            showTm INT,
            watchGradeNm VARCHAR(100),
            rank INT,
            salesAcc BIGINT,
            audiAcc BIGINT
            );`
        )
    } catch {

    }
}
createTables();