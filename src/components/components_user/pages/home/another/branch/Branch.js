import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categories_NewsApi from "../../../../../../api/categories_NewsApi";
import newsApi from "../../../../../../api/newsApi";

function Branch(props) {
  const [newsApiList, setNewsApiList] = useState([]);
  const [categories_NewsApiList, setCategories_NewsApiList] = useState([]);
  const [search, setSearch] = useState();
  useEffect(() => {
    const fetchCategoriesApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 1000000000, page: 1 };
        const responseCategoryNews = await categories_NewsApi.getAll(params);
        setCategories_NewsApiList(responseCategoryNews);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(fetchCategoriesApiList, 1000);
  }, []);
  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: "Đo đạc và bản đồ", PAGE_SIZE: 2, page: 1 };
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, []);
  const handleNav = (id) => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: id, PAGE_SIZE: 2, page: 1 };
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
        console.log(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  };
  return (
    <div className="col-md-12">
      <div className="row form-group">
        <div className="col-md-12 scroll-tab">
          <ul
            className="nav nav-tabs nav-tabs-inline bg-light-grey special-news-tabs"
            role="tablist"
          >
            {categories_NewsApiList.map((list, index) =>
              index !== 1 && index !== 2 && index !== 3 ? (
                <li
                  className="nav-item"
                  key={index}
                  onClick={(e) => handleNav(list.title)}
                >
                  <a
                    className={index === 0 ? "nav-link active" : "nav-link"}
                    id="news-environment-tab"
                    data-toggle="pill"
                    href="#news-environment"
                    role="tab"
                    aria-controls="news-environment"
                    aria-selected="true"
                  >
                    {list.title}
                  </a>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="news-environment"
              role="tabpanel"
              aria-labelledby="news-environment-tab"
            >
              <div className="row">
                <div className="col-md-12">
                  <br />
                  {newsApiList.map((list, index) => (
                    <div
                      className="row other-news"
                      key={index}
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="col-md-3">
                        <Link to={"/news-detail/" + list.id}>
                          <img
                            className="other-article-image"
                            src={
                              process.env.REACT_APP_IMAGE_URL + "/" + list.image
                            }
                            height="107.33333333333333"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="col-md-9">
                        <a
                          style={{ color: "black" }}
                          href={"/news-detail/" + list.id}
                        >
                          ▶ {list.title}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branch;
