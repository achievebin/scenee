-- mariaDB
-- 사용자 테이블 생성 (users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    isDeleted BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    UNIQUE KEY unique_email (email)
);

-- 리뷰 테이블 생성 (reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    isDisabled BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 즐겨찾기 테이블 생성 (favorites)
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    UNIQUE KEY unique_favorite (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 공지사항 및 이벤트 테이블 생성 (notices)
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    type INT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- 리뷰에 대한 댓글 기능 테이블 (comments)
-- 리뷰와 댓글 신고 기능 테이블 (reports)
-- 리뷰와 댓글 좋아요 기능 테이블 (likes)
-- 유저 활동 로그 (activity_logs)