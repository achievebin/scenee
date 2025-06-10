// components/Home/Footer.jsx
import React from "react";
import FooterLeft from "../Footer/FooterLeft";
import FooterCenter from "../Footer/FooterCenter";
import FooterRight from "../Footer/FooterRight";
import "../Footer/Footer.css";

const Footer = () => (
    <footer className="footer">
        <div className="footer-container">
            <FooterLeft />
            <FooterCenter />
            <FooterRight />
        </div>
    </footer>
);

export default Footer;
