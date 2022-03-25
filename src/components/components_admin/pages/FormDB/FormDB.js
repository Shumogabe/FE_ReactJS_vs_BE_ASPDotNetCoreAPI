import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryNews from "./category_news/CategoryNews";
import CategoryDocuments from "./category_documents/CategoryDocuments";
import Documents from "./document/Documents";
import News from "./news/News";
import Questions from "./question/Question";
import PNF from "../Error404/PNF";
import BtnCreate from "./BtnCreate";

function FormDB(props) {
  const [pageSize, setPageSize] = useState(3);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [mousePage, setMousePage] = useState(false);
  const [mousePre, setMousePre] = useState(false);

  const [total, setTotal] = useState(localStorage.getItem("_total"));

  const changePage = () => {
    setMousePage(!mousePage);
    // console.log(123);
    // console.log(mouse);
    // setTotal(localStorage.getItem("_total"));
  };
  const changePre = () => {
    setMousePre(!mousePre);
    // console.log(123);
    // console.log(mouse);
    // setTotal(localStorage.getItem("_total"));
  };

  useEffect(() => {
    setTotal(localStorage.getItem("_total"));
    // console.log(localStorage.getItem("_total"));
    // console.log();
    // console.log("total: " + total);
    // console.log("pageSize: " + pageSize);
  }, [mousePage]);

  useEffect(() => {
    setPage(1);
    // console.log(localStorage.getItem("_total"));
    // console.log();
    // console.log("total: " + total);
    // console.log("pageSize: " + pageSize);
  }, [mousePre]);

  // console.log(Math.ceil(total / pageSize));

  const handlePrevious = () => {
    setPage((page) => page - 1);
  };
  const handleNext = () => {
    setPage((page) => page + 1);
  };

  return (
    <React.Fragment>
      {/* Begin Page Content */}
      <div className="container-fluid" onMouseEnter={changePre}>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <Routes>
            <Route path="/questions" element={""} />
            <Route path="/*" element={<BtnCreate />} />
          </Routes>
          <div className="card-body">
            <div className="table-responsive">
              {/* Header DBTable */}
              <div className="row">
                <div className="col-sm-12 col-md-9">
                  <div className="dataTables_length" id="dataTable_length">
                    <label>
                      Hiển thị{" "}
                      <select
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                        onChange={(e) => setPageSize(e.target.value)}
                      >
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                      </select>{" "}
                      thực thể
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-3">
                  <div
                    id="dataTable_filter"
                    className="dataTables_filter d-flex"
                  >
                    <label>
                      <span className="mt-2">Tìm kiếm: </span>
                      <input
                        type="search"
                        className="form-control form-control-sml"
                        aria-controls="dataTable"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* End Header DBTable */}

              {/* Body */}
              {/* <Category_news /> */}
              <Routes>
                <Route
                  path="/category-news"
                  exact
                  element={
                    <CategoryNews
                      search={search}
                      pageSize={pageSize}
                      page={page}
                    />
                  }
                />
                <Route
                  path="/category-documents"
                  exact
                  element={
                    <CategoryDocuments
                      search={search}
                      pageSize={pageSize}
                      page={page}
                    />
                  }
                />
                <Route
                  path="/news"
                  exact
                  element={
                    <News search={search} pageSize={pageSize} page={page} />
                  }
                />
                <Route
                  path="/documents"
                  exact
                  element={
                    <Documents
                      search={search}
                      pageSize={pageSize}
                      page={page}
                    />
                  }
                />
                <Route
                  path="/questions"
                  exact
                  element={
                    <Questions
                      search={search}
                      pageSize={pageSize}
                      page={page}
                    />
                  }
                />
                <Route path="*" element={<PNF />} />
              </Routes>
              {/* End Body */}

              {/* Footer DBTable */}
              <div className="row" onMouseEnter={changePage}>
                <div className="col-12">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="dataTable_paginate"
                  >
                    <ul className="pagination">
                      <li
                        className="paginate_button page-item previous"
                        id="dataTable_previous"
                      >
                        <button
                          aria-controls="dataTable"
                          className=" btn btn-outline-primary"
                          disabled={page <= 1}
                          onClick={handlePrevious}
                        >
                          ⟪ Previous
                        </button>
                      </li>

                      <li
                        className="paginate_button page-item next"
                        id="dataTable_next"
                      >
                        <button
                          aria-controls="dataTable"
                          className=" btn btn-outline-primary"
                          disabled={page >= Math.ceil(total / pageSize)}
                          onClick={handleNext}
                        >
                          Next ⟫
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Footer DBTable */}
            </div>
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </React.Fragment>
  );
}

export default FormDB;
