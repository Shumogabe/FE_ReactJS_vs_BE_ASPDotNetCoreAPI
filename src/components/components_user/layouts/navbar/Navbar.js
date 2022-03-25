import { useEffect, useState } from "react";
import React, { Component } from "react";
import categories_NewsApi from "../../../../api/categories_NewsApi";
import categories_DocumentsApi from "../../../../api/categories_DocumentsApi";
import home from "./home.svg";
import Login from "../login/Login";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [categories_NewsApiList, setCategories_NewsApiList] = useState([]);
  const [categories_DocumentsApiList, setCategories_DocumentsApiList] =
    useState([]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(true);

  useEffect(() => {
    const fetchCategoriesApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 1000000000, page: 1 };
        const responseCategoryNews = await categories_NewsApi.getAll(params);
        setCategories_NewsApiList(responseCategoryNews);
        const responseCategoryDocuments =
          await categories_DocumentsApi.getAll();
        setCategories_DocumentsApiList(responseCategoryDocuments);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(fetchCategoriesApiList, 1000);
  }, []);

  function Nav(props) {
    return (
      <div>
        <li key={props.id} className={props.className}>
          <Link
            className="nav-link"
            to={props.href}
            onClick={() => {
              document.title = props.name;
              handleClick();
            }}
          >
            {props.name}
          </Link>
        </li>
      </div>
    );
  }

  function Navdropdown(params) {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link "
          href="/#"
          id={params.id}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {params.name}
        </a>
        <Dropdown
          id={params.id}
          nameArray={params.nameChild}
          category={params.category}
        />
      </li>
    );
  }
  console.log(categories_NewsApiList);

  return (
    <div className="nav-bar">
      <nav className="navbar navbar-expand-lg nav-backgr">
        <div className="container nav-mar">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => {
              document.title = "SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG";
            }}
          >
            <img src={home} alt="" />
          </Link>
          <button
            className="navbar-toggler border-light border-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={closeMobileMenu}
          >
            <i className="fa fa-bars text-light" />
          </button>
          <div
            className={
              click
                ? "collapse navbar-collapse show"
                : "collapse navbar-collapse "
            }
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Nav
                id="1"
                name="Giới thiệu"
                href="/introduce"
                className="nav-item"
              />
              <Navdropdown
                id="2"
                name="Tin tức - sự kiện"
                category="news/"
                nameChild={categories_NewsApiList}
              />
              <Navdropdown
                id="3"
                name="Văn bản"
                category="documents/"
                nameChild={categories_DocumentsApiList}
              />
              <Nav id="4" name="Liên hệ" href="/contact" className="nav-item" />
              <Nav
                id="5"
                name="Hỏi đáp"
                href="/question"
                className="nav-item"
              />
              <Nav
                id="5"
                name="Login"
                href="/login"
                className="nav-item btn-login"
              />
            </ul>
            <Login />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
