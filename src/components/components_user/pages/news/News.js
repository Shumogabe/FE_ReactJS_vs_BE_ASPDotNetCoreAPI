import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import newsApi from "../../../../api/newsApi";
import "./News.css";

function News() {
  const [newsApiList, setNewsApiList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [total, setTotal] = useState();

  let { id } = useParams(); // Dùng để phân biệt

  useEffect(() => {
    var search = "";
    switch (id) {
      case "tin-hoat-dong":
        search = "Tin hoạt động";
        break;
      case "su-kien":
        search = "Sự kiện";
        break;
      case "thong-bao":
        search = "Thông báo";
        break;
      default:
        break;
    }
    const fetchNewsApiList = async () => {
      try {
        const params = { search: search, PAGE_SIZE: pageSize, page: page };
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
        setTotal(response.length);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [id]);

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: search, PAGE_SIZE: pageSize, page: page };
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
        setTotal(response.length);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [search]);

  // const handlePrevious = () => {
  //   setPage((page) => page - 1);
  // };
  // const handleNext = () => {
  //   setPage((page) => page + 1);
  // };
  return (
    <div className="news">
      <div className="row g-3">
        <div className="col-12">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="🔍 Nhập thông tin tìm kiếm"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          {newsApiList.map((list, index) => (
            <Link to={"/news-detail/" + list.id} key={index}>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + "/" + list.image}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{list.title}</h5>
                      <p className="card-text">{list.description}</p>
                      <p className="card-text">
                        <i className="fas fa-clock light-blue" />{" "}
                        <small className="text-muted">{list.createdDate}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="col-12">
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
        </div> */}
      </div>
    </div>
  );
}

export default News;
