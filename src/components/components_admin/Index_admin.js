import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./layouts/sidebar/SideBar";
import Topbar from "./layouts/topbar/Topbar";
import Totop from "./layouts/totop/Totop";
import LogoutModal from "./layouts/logout_modal/LogoutModal";
import PageHeading from "./layouts/pageheading/PageHeading";
import Dashboard from "./pages/dashboard/Dashboard";
import PNF from "./pages/Error404/PNF";
import Profile from "./pages/profile/Profile";
import CreateUpdateCategoryNews from "./pages/FormDB/category_news/create_update/CreateUpdate";
import CreateUpdateCategoryDocuments from "./pages/FormDB/category_documents/create_update/CreateUpdate";
import CreateUpdateNews from "./pages/FormDB/news/create_update/CreateUpdate";
import CreateUpdateDocuments from "./pages/FormDB/document/create_update/CreateUpdate";
import CreateUpdateQuestions from "./pages/FormDB/question/create_update/CreateUpdate";
import "./assets/css/sb-admin-2.min.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";
import FormDB from "./pages/FormDB/FormDB";

function Index_admin(props) {
  useEffect(() => {
    setTimeout(sessionStorage.clear, Date.now() + 120 * 60000);
  }, []);
  document.title = "HỆ THỐNG SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG";
  return (
    <div>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <SideBar />
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Topbar />
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* Page Heading */}
              <PageHeading />
              {/* Content Row */}

              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/*" exact element={<FormDB />} />

                {/* CRUD category_news */}
                <Route
                  path="/category-news/create"
                  exact
                  element={<CreateUpdateCategoryNews />}
                />
                <Route
                  path="/category-news/update/:id"
                  exact
                  element={<CreateUpdateCategoryNews />}
                />
                <Route
                  path="/category-news/delete/:id"
                  exact
                  element={<Navigate to="/dashboard/category-news" />}
                />
                {/* End category_news */}

                {/* CRUD category_documents */}
                <Route
                  path="/category-documents/create"
                  exact
                  element={<CreateUpdateCategoryDocuments />}
                />
                <Route
                  path="/category-documents/update/:id"
                  exact
                  element={<CreateUpdateCategoryDocuments />}
                />
                <Route
                  path="/category-documents/delete/:id"
                  exact
                  element={<Navigate to="/dashboard/category-documents" />}
                />
                {/* End category_documents */}

                {/* CRUD news */}
                <Route
                  path="/news/create"
                  exact
                  element={<CreateUpdateNews />}
                />
                <Route
                  path="/news/update/:id"
                  exact
                  element={<CreateUpdateNews />}
                />
                <Route
                  path="/news/delete/:id"
                  exact
                  element={<Navigate to="/dashboard/news" />}
                />
                {/* End news */}

                {/* CRUD documents */}
                <Route
                  path="/documents/create"
                  exact
                  element={<CreateUpdateDocuments />}
                />
                <Route
                  path="/documents/update/:id"
                  exact
                  element={<CreateUpdateDocuments />}
                />
                <Route
                  path="/documents/delete/:id"
                  exact
                  element={<Navigate to="/dashboard/documents" />}
                />
                {/* End documents */}

                {/* CRUD questions */}
                <Route
                  path="/questions/update/:id"
                  exact
                  element={<CreateUpdateQuestions />}
                />
                <Route
                  path="/questions/delete/:id"
                  exact
                  element={<Navigate to="/dashboard/questions" />}
                />
                {/* End questions */}

                <Route path="/profile" exact element={<Profile />} />
                <Route path="*" element={<PNF />} />
              </Routes>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <Totop />
      {/* Logout Modal*/}
      <LogoutModal />
    </div>
  );
}

export default Index_admin;
