-- mariaDB
-- 사용자 테이블 생성 (users)
CREATE TABLE NOT EXISTS users{
    id INT AUTO_INCREMENT,
    -- 이용자 고유번호
    username VARCHAR(255) NOT NULL,
    -- 이용자 아이디
    password VARCHAR(255) NOT NULL,
    -- 이용자 비밀번호
    nickname VARCHAR(255) NOT NULL,
    -- 이용자 닉네임
    email VARCHAR(255),
    -- 이용자 이메일
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- 생성일자
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- 갱신일자
    PRIMARY KEY(id)
};
-- 리뷰 테이블 생성 (reviews)
CREATE TABLE NOT EXISTS reviews{
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    -- TMDB의 영화 ID
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
};
-- 즐겨찾기 테이블 생성 (favorites)
CREATE TABLE NOT EXISTS favorites{
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    -- TMDB의 영화 ID
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    UNIQUE KEY unique_favorite (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
};
-- 공지사항 및 이벤트 테이블 생성 (notices)
CREATE TABLE NOT EXISTS notices{
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    -- 제목
    type INT NOT NULL,
    -- 공지사항: 0, 이벤트: 1
    content TEXT NOT NULL,
    -- 내용
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
}