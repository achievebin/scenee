import React from 'react';

function ProfileInfo({ user }) {
  return (
    <div>
      <h2>{user.nickname}님의 프로필</h2>
      <p>아이디: {user.username}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}

export default ProfileInfo;
