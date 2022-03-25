import React, { useState } from "react";
import { Link } from "react-router-dom";
import { parseJwt } from "../parseJWT";
import Search from "./search/Search";

function Topbar(props) {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(true);

  const account = parseJwt(sessionStorage.getItem("admin"));

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top">
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        // type="button"
        data-bs-toggle="collapse"
        data-bs-target="#accordionSidebar"
        aria-controls="accordionSidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={closeMobileMenu}
      >
        <i className="fa fa-bars" />
      </button>
      {/* Topbar Search */}
      {/* <Search /> */}
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Search Dropdown (Visible Only XS) */}
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw" />
          </a>
          {/* Dropdown - Messages */}
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600">
              {account.unique_name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="/assets/img/undraw_profile.svg"
              alt=""
            />
          </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/dashboard/profile">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Thông tin cá nhân
            </Link>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href="/#"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Đăng suất
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
