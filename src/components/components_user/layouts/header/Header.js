import React, { Component, memo } from "react";
import { Link } from "react-router-dom";

import "./header.css";
function Header() {
  return (
    <header>
      <Link
        to="/"
        onClick={() => (document.title = "SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG")}
      >
        <img
          className="img-header"
          alt="SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG BÌNH ĐỊNH"
          src="/images/banners/Banner.gif"
        />
      </Link>
    </header>
  );
}

export default memo(Header);
