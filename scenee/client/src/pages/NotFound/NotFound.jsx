import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>죄송합니다. 요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
