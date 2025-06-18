// src/components/Footer/ContactPage.jsx
import { useState, useEffect } from "react";
import { sendInquiry } from "../../api/contactApi.js";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  // 로그인 정보 가져오기 (localStorage 사용 예시)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);
  const isLoggedIn = Boolean(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인된 상태이고, 입력된 이름/이메일이 다르면 제출 차단
    if (isLoggedIn && (form.name !== user.name || form.email !== user.email)) {
      alert("이름/이메일이 로그인 정보와 일치해야 문의를 보낼 수 있습니다.");
      return;
    }
    try {
      await sendInquiry(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // 제출 가능 여부
  const canSubmit =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.subject.trim() !== "" &&
    form.message.trim() !== "" &&
    (!isLoggedIn || (form.name === user.name && form.email === user.email));

  return (
    <div className={styles.ContactSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>고객센터</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            이름
            <input
              className={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              required
            />
          </label>

          <label className={styles.field}>
            이메일
            <input
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </label>

          {/* 로그인 상태에서 매칭 오류 시 경고 */}
          {isLoggedIn && (form.name !== user.name || form.email !== user.email) && (
            <p className={styles.error}>
              이름/이메일이 로그인 정보와 일치해야 문의를 보낼 수 있습니다.
            </p>
          )}

          <label className={styles.field}>
            제목
            <input
              className={styles.input}
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="문의 제목을 입력해주세요"
              required
            />
          </label>

          <label className={styles.field}>
            메시지
            <textarea
              className={styles.textarea}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="문의 내용을 자세히 입력해주세요..."
              required
              rows={6}
            />
          </label>

          <button className={styles.button} type="submit" disabled={!canSubmit}>
            제출하기
          </button>
        </form>

        {status === "success" && (
          <p className={styles.success}>
            문의가 성공적으로 접수되었습니다. 감사합니다!
          </p>
        )}
        {status === "error" && (
          <p className={styles.error}>
            전송 중 오류가 발생했습니다. 다시 시도해 주세요.
          </p>
        )}
      </div>
    </div>
  );
}
