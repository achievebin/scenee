// src/pages/ContactPage.jsx
import React, { useState } from "react";
import "./contact.css";
const contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="contact-container">
      <h1>문의사항</h1>
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            이름
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            이메일
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            제목
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            내용
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">전송하기</button>
        </form>
      ) : (
        <p className="thank-you">
          문의가 성공적으로 접수되었습니다. 감사합니다!
        </p>
      )}
    </div>
  );
};

export default contact;
