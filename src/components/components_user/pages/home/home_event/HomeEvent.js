import React from "react";

function HomeEvent(props) {
  return (
    <React.Fragment>
      <div className="banner-link">
        <a
          href="http://chuyentrangsk.monre.gov.vn/nghiquyettw4/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: "99.5%" }}
            className="banner-body-top"
            alt=""
            src="https://www.monre.gov.vn/Portal/PublishingImages/Banner/2021/Ban_can_su_20210601.jpg"
          />
        </a>
      </div>
      <div className="banner-link">
        <a target="_blank" href="/#" rel="noreferrer">
          <img
            alt=""
            style={{ width: "99.5%" }}
            src="http://sotnmt.namdinh.gov.vn/uploads/Link/637816423143387055.png"
          />
        </a>
      </div>
      <div className="banner-link">
        <a target="_blank" href="/#" rel="noreferrer">
          <img
            style={{ width: "99.5%" }}
            src="http://sotnmt.namdinh.gov.vn/uploads/Link/637816424870407405.jpg"
            alt=""
          />
        </a>
      </div>
    </React.Fragment>
  );
}

export default HomeEvent;
