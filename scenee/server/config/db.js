//config: 프로젝트 전반에 사용하는 공통 파일 설정을 모아두는 공간
import mariadb from 'mariadb';
import dotenv from 'dotenv';
//dotenv 라이브러리를 활용하여 정보를 감춤
dotenv.config();

//mariaDB와 연결하기 위한 객체 생성
const pool = mariadb.createPool({
  host: process.env.DB_Host,
  user: process.env.DB_Username,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  connectionLimit: 5,

});

export default pool;