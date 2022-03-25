import React from "react";
import { Route, Routes } from "react-router-dom";

export const HeadingDashboard = () => "Dashboard";
export const HeadingCategory_news = () => "Loại tin tức";
export const HeadingCategory_documents = () => "Loại văn bản";
export const HeadingNews = () => "Tin tức - sự kiện";
export const HeadingDocuments = () => "Văn bản";
export const HeadingQuestions = () => "Hỏi đáp";
export const HeadingProfile = () => "Thông tin cá nhân";

function PageHeading(props) {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">
        <Routes>
          <Route path="/" exact element={<HeadingDashboard />} />
          <Route
            path="/category-news"
            exact
            element={<HeadingCategory_news />}
          />
          <Route
            path="/category-documents"
            exact
            element={<HeadingCategory_documents />}
          />
          <Route path="/news" exact element={<HeadingNews />} />
          <Route path="/documents" exact element={<HeadingDocuments />} />
          <Route path="/questions" exact element={<HeadingQuestions />} />
          <Route path="/profile" exact element={<HeadingProfile />} />
        </Routes>
      </h1>
    </div>
  );
}

export default PageHeading;
