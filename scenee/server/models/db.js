//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
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