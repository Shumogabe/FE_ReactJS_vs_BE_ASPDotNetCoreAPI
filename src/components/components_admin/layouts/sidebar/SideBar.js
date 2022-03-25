import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavItems } from "./NavItems";
import "./sidebar.css";
import newsApi from "../../../../api/newsApi";
import documentsApiApi from "../../../../api/documentsApi";
import categories_NewsApi from "../../../../api/categories_NewsApi";
import categories_DocumentsApi from "../../../../api/categories_DocumentsApi";
import questionsApi from "../../../../api/questionsApi";

function SideBar(props) {
  const [active, setActive] = useState();
  const [index, setIndex] = useState();

  const handleActive = (id, index) => {
    setActive(id);
    setIndex(index);

    // Handle Save Total

    switch (index) {
      case 1:
        localStorage.setItem("_total", categoryNewsApiList);
        break;
      case 2:
        localStorage.setItem("_total", categoryDocumentsApiList);
        break;
      case 3:
        localStorage.setItem("_total", newsApiList);
        break;
      case 4:
        localStorage.setItem("_total", documentsApiList);
        break;
      case 5:
        localStorage.setItem("_total", questionsApiList);
        break;
      default:
        break;
    }
  };

  const [categoryNewsApiList, setCategoryNewsApiList] = useState([]);
  const [categoryDocumentsApiList, setCategoryDocumentsApiList] = useState([]);
  const [newsApiList, setNewsApiList] = useState([]);
  const [documentsApiList, setDocumentsApiList] = useState([]);
  const [questionsApiList, setQuestionsApiList] = useState([]);

  useEffect(() => {
    const params = { PAGE_SIZE: 1000000000, page: 1 };
    const fetchAPIsList = async () => {
      try {
        const responseNews = await newsApi.getAll(params);
        setNewsApiList(responseNews.length);
        const responseDocument = await documentsApiApi.getAll(params);
        setDocumentsApiList(responseDocument.length);
        const responseCategoryNews = await categories_NewsApi.getAll(params);
        setCategoryNewsApiList(responseCategoryNews.length);
        const responseCategoryDocuments = await categories_DocumentsApi.getAll(
          params
        );
        setCategoryDocumentsApiList(responseCategoryDocuments.length);
        const responseQuestions = await questionsApi.getAll(params);
        setQuestionsApiList(responseQuestions.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPIsList();
  }, []);

  return (
    <ul
      className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <img src="/images/icons/monre-logo.png" alt="" />
        {/* <div className="sidebar-brand-text mx-3">SYSTEM</div> */}
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Nav Item - Dashboard */}
      {NavItems.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            handleActive(window.location.pathname, index);
          }}
          className={active === item.href ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to={item.href}>
            <div className="row">
              <div className="col-2 icon-left">
                <i className={item.icon} />
              </div>
              <div className="col-10">
                <span>{item.name}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;
