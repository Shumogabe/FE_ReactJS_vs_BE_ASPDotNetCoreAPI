import React, { Component } from "react";
import "./contact.css";

function Contact() {
  return (
    <div className="contact">
      <div className="row g-3">
        <div className="col-md-6">
          <p className="text-success text-uppercase fs-5 fw-bolder">
            Sở Tài nguyên và Môi trường
          </p>
          <p>
            Địa chỉ: Số 28 Phạm Văn Đồng, P. Dịch Vọng Hậu, Q. Cầu Giấy, Tp. Hà
            Nội
          </p>
          <p>
            Điện thoại: <a href="tel:0123456789">0123456789</a>
          </p>
          <p>
            FAX: <a href="fax:0123456789">0123456789</a>
          </p>
          <p>
            Email: <a href="mailto:abc@xyz.com">abc@xyz.com</a>
          </p>
        </div>
        <div className="col-md-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6985707192807!2d105.779108014905!3d21.044743635989658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454cb58e876d1%3A0xab62ef7417c81219!2zQ-G7pWMgQ8O0bmcgbmdo4buHIHRow7RuZyB0aW4gdsOgIEThu68gbGnhu4d1IFTDoGkgbmd1ecOqbiBtw7RpIHRyxrDhu51uZw!5e0!3m2!1svi!2s!4v1642655394542!5m2!1svi!2s"
            style={{ border: 0, width: "100%", height: "450px" }}
            allowFullScreen
            loading="lazy"
            title="framemap"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
