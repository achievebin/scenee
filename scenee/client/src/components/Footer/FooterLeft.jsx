import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../Common/Modal";
import TermsContent from "./terms";
import PrivacyContent from "./PrivacyPage";
import NoEmailContent from "./no_email";
import Logo from "../../assets/images/logo.png";
import styles from "./FooterLeft.module.css";

export default function FooterLeft() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className={styles.footerColLeft}>
      <div className={styles.linksSocial}>
        <ul className={styles.links}>
          <li>
            <button
              className={styles.linkButton}
              onClick={() => setOpenModal("terms")}
            >
              이용약관
            </button>
          </li>
          <li>
            <button
              className={styles.linkButton}
              onClick={() => setOpenModal("privacy")}
            >
              개인정보처리방침
            </button>
          </li>
          <li>
            <Link to="/contact" className={styles.linkButton}>
              문의하기
            </Link>
          </li>
          <li>
            <Link to="/notice" className={styles.linkButton}>
              공지사항
            </Link>
          </li>
          <li>
            <button
              className={styles.linkButton}
              onClick={() => setOpenModal("no_email")}
            >
              이메일무단수집거부
            </button>
          </li>
        </ul>
        <div className={styles.social}>
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

      <div className={styles.company}>
        <img src={Logo} alt="SCENEE Logo" className={styles.logo} />
        <div className={styles.companyText}>
          <p>
            주식회사: SCENEE | 서울특별시 서초구 강남대로 375 | 대표: 이용범 |
            TEL: 1588-4444
          </p>
          <p>copyright Ⓒ 2025 by GLOBAL. All rights reserved.</p>
        </div>
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
        isOpen={openModal === "no_email"}
        onClose={() => setOpenModal(null)}
        title="이메일무단수집거부"
      >
        <NoEmailContent />
      </Modal>
    </div>
  );
}
