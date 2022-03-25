import React from "react";
import HomeAnother from "./another/HomeAnother";
import Banner from "./banner/Banner";
import HomeEvent from "./home_event/HomeEvent";
import HomeNews from "./home_news/HomeNews";
import "./home.css";

function Home(props) {
  return (
    <div className="home">
      <div className="row g-3">
        <div className="col-4">
          <HomeNews />
        </div>
        <div className="col-8">
          <Banner />
        </div>
        <HomeEvent />
        <HomeAnother />
      </div>
    </div>
  );
}

export default Home;
