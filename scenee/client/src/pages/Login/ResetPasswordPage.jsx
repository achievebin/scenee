// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPasswordPage.css"; // CSS 임포트

// URL 쿼리 파라미터에서 token을 읽어오기 위한 커스텀 훅
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token") || ""; // URL: /reset-password?token=abcdef

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // 토큰이 없으면 접근 불가 → 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인을 모두 입력하세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axiosInstance.post("/find/password/reset", {
        token,
        newPassword,
      });
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      setError(msg);
    }
  };

  return (
    <div className="reset-container">
      <h1>비밀번호 재설정</h1>

      {error && <div className="message-error">{error}</div>}
      {message && <div className="message-success">{message}</div>}

      <div className="input-group">
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button onClick={handleReset}>비밀번호 재설정</button>
    </div>
  );
}
