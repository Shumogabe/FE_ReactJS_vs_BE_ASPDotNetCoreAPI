import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import newsApi from "../../../../api/newsApi";
import categories_NewsApi from "../../../../api/categories_NewsApi";

import "./breadcrumbMarquee.css";

export const BreadcrumbIntroduce = () => (
  <li className="breadcrumb-item">Giới thiệu</li>
);

export const BreadcrumbNews = () => {
  let { id } = useParams();
  var page = "";
  switch (id) {
    case "tin-hoat-dong":
      page = "Tin hoạt động";
      break;
    case "su-kien":
      page = "Sự kiện";
      break;
    case "thong-bao":
      page = "Thông báo";
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <li className="breadcrumb-item">Tin tức - Sự kiện</li>
      <li className="breadcrumb-item" aria-current="page">
        {page}
      </li>
    </React.Fragment>
  );
};

export const BreadcrumbNewsDetail = () => {
  const [news, setNews] = useState();
  const [categories_NewsApiList, setCategories_NewsApiList] = useState();

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const response = await newsApi.get(id);
        setNews(response.title);
        const responseCategoryNews = await categories_NewsApi.get(
          response.category_News_id
        );
        setCategories_NewsApiList(responseCategoryNews.title);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [id]);
  return (
    <React.Fragment>
      <li className="breadcrumb-item">Tin tức - Sự kiện</li>
      <li className="breadcrumb-item">
        <Link
          to={
            "/news/" +
            (categories_NewsApiList &&
              categories_NewsApiList
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .replace(/\s/g, "-"))
          }
        >
          {categories_NewsApiList}
        </Link>
      </li>
      <li className="breadcrumb-item" aria-current="page">
        {news}
      </li>
    </React.Fragment>
  );
};

export const BreadcrumbDocuments = () => {
  let { id } = useParams();
  var page = "";
  switch (id) {
    case "do-dac-va-ban-do":
      page = "Đo đạc và bản đồ";
      break;
    case "thanh-tra":
      page = "Thanh tra";
      break;
    case "moi-truong":
      page = "Môi trường";
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <li className="breadcrumb-item">Văn bản</li>
      <li className="breadcrumb-item" aria-current="page">
        {page}
      </li>
    </React.Fragment>
  );
};

export const BreadcrumbContact = () => (
  <li className="breadcrumb-item">Liên hệ</li>
);
export const BreadcrumbQuestion = () => (
  <li className="breadcrumb-item">Hỏi đáp</li>
);
export const BreadcrumbPNF = () => ". . .";

function Marquee(params) {
  const [newsApiList, setNewsApiList] = useState([]);
  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 100000, page: 1 };
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
    <div className="news-day bg-sky">
      <span className="mar">
        Tin tức <span className="new">mới</span>
      </span>
      <span className="marquee">
        {newsApiList.map((list, index) => (
          <a href={"/news-detail/" + list.id}>
            <span key={index}>● {list.title}&ensp; </span>
          </a>
        ))}
      </span>
    </div>
  );
}

function Breadcrumb(params) {
  return (
    <div className="news-day bg-light border">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to="/">
            <i className="fa fa-home" />
          </Link>
        </li>
        <Routes>
          <Route path="/introduce" exact element={<BreadcrumbIntroduce />} />
          <Route path="/news/:id" exact element={<BreadcrumbNews />} />
          <Route
            path="/news-detail/:id"
            exact
            element={<BreadcrumbNewsDetail />}
          />

          <Route
            path="/documents/:id"
            exact
            element={<BreadcrumbDocuments />}
          />
          <Route path="/contact" exact element={<BreadcrumbContact />} />
          <Route path="/question" exact element={<BreadcrumbQuestion />} />
          <Route path="*" element={<BreadcrumbPNF />} />
        </Routes>
      </ol>
    </div>
  );
}

function BreadcrumbMarquee(props) {
  return (
    <div className="breadcrumb-marquee">
      <Routes>
        <Route path="/" element={<Marquee />} />
        <Route path="/*" element={<Breadcrumb />} />
      </Routes>
    </div>
  );
}

export default BreadcrumbMarquee;
