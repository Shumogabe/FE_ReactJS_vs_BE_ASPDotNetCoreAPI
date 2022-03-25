import React, { memo } from "react";
import { Banner } from "./Banner";
import "./banner_link.css";

function Banner_Link(props) {
  return (
    <div className="banners-link">
      <div className="row">
        <div className="col-md-12">
          {Banner.map((banner, index) => (
            <div key={index} className="banner-link">
              <a target="_blank" rel="noreferrer" href={banner.href}>
                <img src={banner.src} alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Banner_Link);
