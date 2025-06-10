// components/Home/Footer/FooterLeft.jsx
import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import Modal from "../Common/modal";
import TermsContent from "./terms";
import PrivacyContent from "./PrivacyPage ";
import ContactPage from "./contact";
import NoticeContent from "./notice";
import NoEmailContent from "./no_email";

const FooterLeft = () => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="footer-col footer-col--left">
      <div className="footer-links-social">
        <ul className="footer-links">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("terms");
              }}
            >
              이용약관
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("privacy");
              }}
            >
              개인정보처리방침
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("contact");
              }}
            >
              문의하기
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("notice");
              }}
            >
              공지사항
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal("no_email");
              }}
            >
              이메일무단수집거부
            </a>
          </li>
        </ul>
        <div className="footer-social">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="footer-company">
        <img src={Logo} alt="SCENEE Logo" className="footer-logo" />
        <p>
          주식회사: SCENEE | 서울특별시 서초구 강남대로 375 | 대표: 이용범 |
          TEL: 1588-4444
        </p>
        <p>copyright Ⓒ 2025 by GLOBAL. All rights reserved.</p>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openModal === "terms"}
        onClose={() => setOpenModal(null)}
        title="이용약관"
      >
        <TermsContent />
      </Modal>
      <Modal
        isOpen={openModal === "privacy"}
        onClose={() => setOpenModal(null)}
        title="개인정보처리방침"
      >
        <PrivacyContent />
      </Modal>
      <Modal
        isOpen={openModal === "contact"}
        onClose={() => setOpenModal(null)}
        title="문의하기"
      >
        <ContactPage />
      </Modal>
      <Modal
        isOpen={openModal === "notice"}
        onClose={() => setOpenModal(null)}
        title="공지사항"
      >
        <NoticeContent />
      </Modal>
      <Modal
        isOpen={openModal === "no_email"}
        onClose={() => setOpenModal(null)}
        title="이메일무단수집거부"
      >
        <NoEmailContent />
      </Modal>
    </div>
  );
};

export default FooterLeft;
