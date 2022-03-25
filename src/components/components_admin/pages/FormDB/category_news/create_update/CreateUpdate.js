import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import categories_NewsApi from "./../../../../../../api/categories_NewsApi";

function CreateUpdate(props) {
  const [news, setNews] = useState();
  const [message, setMessage] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryNewsApiList = async () => {
      try {
        const response = await categories_NewsApi.get(id);
        setNews(response.title);
      } catch (error) {
        console.log(error);
      }
    };
    id && fetchCategoryNewsApiList();
  }, []);

  const fetchCreateNewsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = { title: news };
      if (news === "") {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await categories_NewsApi.post(params, option);
        // console.log(response);
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
    setNews("");
  };

  const fetchUpdateNewsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = { id: id, title: news };
      if (news === "") {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await categories_NewsApi.put(id, params, option);
        // console.log(response);
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h3>{id ? "Sửa" : "Thêm mới"} loại tin</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <form>
              <div className="m-3">
                <label htmlFor="title" className="form-label">
                  Tiêu đề
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={(e) => setNews(e.target.value)}
                  value={news}
                />
              </div>

              {(id && (
                <Link
                  to=""
                  onClick={fetchUpdateNewsApiList}
                  type="button"
                  className="btn btn-success m-3"
                >
                  Sửa
                </Link>
              )) || (
                <Link
                  to=""
                  onClick={fetchCreateNewsApiList}
                  type="button"
                  className="btn btn-success m-3"
                >
                  Thêm
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={"alert alert-" + message["alert"] + " col-3"}
          role="alert"
        >
          {message["title"]}{" "}
          {message["alert"] === "success" ? (
            <button className="btn btn-info" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default CreateUpdate;
