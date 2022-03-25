import React, { Component, memo } from "react";
import "./footer.css";
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <p>BẢN QUYỀN THUỘC VỀ SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG</p>
            <p>
              Điện thoại: <a href="tel:0123456789">0123456789</a> - FAX:
              <a href="fax:0123456789">0123456789</a> - Email:{" "}
              <a href="mailto:abc@xyz.com">abc@xyz.com</a>
            </p>
            <p>Cơ quan chủ quản: UBND tỉnh.</p>
          </div>
          <div className="col-3">
            <img
              src="/images/icons/monre-logo.png"
              alt="Logo Sở Tài nguyên Môi trường"
            />
          </div>
          <div className="col info">
            <a href="/#">
              <img src="/images/icons/facebook.png" alt="Facebook Contact" />
            </a>
            <a href="/#">
              <img src="/images/icons/gmail.png" alt="Gmail Contact" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
