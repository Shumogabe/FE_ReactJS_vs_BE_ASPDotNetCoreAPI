import React, { Component, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Header from "./layouts/header/Header";
import Navbar from "./layouts/navbar/Navbar";
import Footer from "./layouts/footer/Footer";
import Map from "./layouts/map/Map";
import StatisicalAccess from "./layouts/statistical_Access/StatisicalAccess";
import Weather from "./layouts/weather/Weather";
import Banner_Link from "./layouts/banner_link/Banner_Link";
import Link_Service from "./layouts/link_service/Link_Service";
import BreadcrumbMarquee from "./layouts/breadcrumb-marquee/BreadcrumbMarquee";
import Totop from "./layouts/totop/Totop";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Contact from "./pages/contact/Contact";
import Question from "./pages/question/Question";
import Documents from "./pages/document/Documents";
import Introduce from "./pages/introduce/Introduce";
import PNF from "./pages/Error404/PNF";
import "./index_user.css";
import NewsDetail from "./pages/news/newsdetail/NewsDetail";
import LandPrice from "./pages/services/land/LandPrice";
import Hotline from "./pages/services/Hotline";
import PlanningInformation from "./pages/services/land/PlanningInformation";

function Indexuser() {
  document.title = "SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG";

  return (
    <div className="main">
      <Header />
      <Navbar />
      <div className="container">
        <div className="row g-3">
          <div className="col-9 content-main">
            <div className="py-3">
              <BreadcrumbMarquee />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/introduce" exact element={<Introduce />} />
                <Route path="/news/:id" exact element={<News />} />
                <Route path="/news-detail/:id" exact element={<NewsDetail />} />
                <Route path="/documents/:id" exact element={<Documents />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/question" exact element={<Question />} />
                <Route path="/land-price" exact element={<LandPrice />} />
                <Route path="/hotline" exact element={<Hotline />} />
                <Route
                  path="/planning-information"
                  exact
                  element={<PlanningInformation />}
                />
                <Route path="*" element={<PNF />} />
              </Routes>
            </div>
          </div>
          <div className="col-3 p-3">
            <div className="content-sidebar">
              <div className="row g-3">
                <div className="sidebar-map">
                  <a href="https://www.google.com/maps/place/Tp.+Qui+Nh%C6%A1n,+B%C3%ACnh+%C4%90%E1%BB%8Bnh,+Vi%E1%BB%87t+Nam/@13.7529638,109.1661134,12.56z/data=!4m5!3m4!1s0x316f6c65736eabd9:0xd362348e5af3d559!8m2!3d13.7829673!4d109.2196634?hl=vi-VN">
                    <Map />
                  </a>
                </div>
                <div className="sidebar-service">
                  <Link_Service />
                </div>
                <div className="sidebar-bannerlink">
                  <Banner_Link />
                </div>
                <div className="sidebar-weather">
                  <Weather />
                </div>
                <div className="sidebar-access">
                  <StatisicalAccess />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Totop />
    </div>
  );
}

export default Indexuser;
