import React from "react";
import { Link, Route, Routes } from "react-router-dom";
export const HandleLink = (props) => {
  return (
    <Link className="btn btn-success" type="" to={props.link}>
      Thêm
    </Link>
  );
};
function BtnCreate() {
  return (
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">
        <Routes>
          <Route
            path="/category-news"
            element={<HandleLink link="/dashboard/category-news/create" />}
          />
          <Route
            path="/category-documents"
            element={<HandleLink link="/dashboard/category-documents/create" />}
          />
          <Route
            path="/news"
            element={<HandleLink link="/dashboard/news/create" />}
          />
          <Route
            path="/documents"
            element={<HandleLink link="/dashboard/documents/create" />}
          />
          <Route
            path="/questions"
            element={<HandleLink link="/dashboard/questions/create" />}
          />
        </Routes>
      </h6>
    </div>
  );
}

export default BtnCreate;
