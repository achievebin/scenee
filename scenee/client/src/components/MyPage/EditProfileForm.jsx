import React, { useEffect, useState } from 'react';
import { updateUser } from '../../api/userApi';
import { validation } from '../../utils/validations';

export default function EditProfileForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
  });
  const [error, setError] = useState(null);

  //이용자 정보로 초기화
  useEffect(() => {
    if (user) {
      setFormData((nickname = user.nickname || ''), (email = user.email || ''));
    }
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(
      (prev = {
        ...prev,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    //잘못된 동작 방지
    e.preventDefult();

    //유효성 검증
    const errorMsg = validation(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const res = await updateUser(user.id, formData);
      onUpdate(res.data);
      alert('프로필이 수정되었습니다.');
    } catch (err) {
      console.error(err);
      setError('프로필 수정 중 오류 발생');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nickname"
        type="nickname"
        placeholder="닉네임"
        value={formData.nickname}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={formData.email}
      />
      <button type="submit">수정하기</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
