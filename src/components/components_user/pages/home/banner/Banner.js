import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import newsApi from "../../../../../api/newsApi";
import "./banner.css";

function Banner(props) {
  const [newsApiList, setNewsApiList] = useState([]);

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 10, page: 1 };
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, []);
  return (
    <div className="banner">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* <div className="carousel-item active">
            <img
              src="images/banners/banners-home/m_12_68ca5b47e9e7639ecfe8eed08ad4c4ae.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Chào mừng ngày môi tr</h5>
            </div>
          </div> */}

          {newsApiList &&
            newsApiList.map((list, index) => (
              <div
                key={index}
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
              >
                <Link to={"/news-detail/" + list.id}>
                  <img
                    src={process.env.REACT_APP_IMAGE_URL + "/" + list.image}
                    className="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>{list.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Banner;
