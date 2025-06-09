// components/Home/Footer/FooterLeft.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import Logo from '../../assets/images/logo.png';

const links = [
  { text: '이용약관', path: '/terms' },
  { text: '개인정보처리방침', path: '/privacy' },
  { text: '문의하기', path: '/contact' },
  { text: '공지사항', path: '/notice' },
  { text: '이메일무단수집거부', path: '/no_email' },
];

const FooterLeft = () => (
  <div className="footer-col footer-col--left">
    <div className="footer-links-social">
      <ul className="footer-links">
        {links.map(({ text, path }) => (
          <li key={text}>
            <Link to={path}>{text}</Link>
          </li>
        ))}
      </ul>
      <div className="footer-social">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaYoutube /></a>
        <a href="#"><FaTwitter /></a>
      </div>
    </div>
    <div className="footer-company">
      <img src={Logo} alt="SCENEE Logo" className="footer-logo" />
      <p>주식회사: SCENEE | 서울특별시 서초구 강남대로 375 | 대표 : 이용범 | TEL : 1588-4444</p>
      <p>copyright Ⓒ 2025 by GLOBAL. All rights reserved.</p>
    </div>
  </div>
);

export default FooterLeft;