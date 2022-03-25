import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import categories_DocumentsApi from "./../../../../../../api/categories_DocumentsApi";

function CreateUpdate(props) {
  const [documents, setDocuments] = useState();
  const [message, setMessage] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDocumentsApiList = async () => {
      try {
        const response = await categories_DocumentsApi.get(id);
        setDocuments(response.title);
      } catch (error) {
        console.log(error);
      }
    };
    id && fetchCategoryDocumentsApiList();
  }, []);

  const fetchCreateDocumentsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = { title: documents };
      if (documents === "") {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await categories_DocumentsApi.post(params, option);
        // console.log(response);
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
    setDocuments("");
  };

  const fetchUpdateDocumentsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = { id: id, title: documents };
      if (documents === "") {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await categories_DocumentsApi.put(id, params, option);
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
          <h3>{id ? "Sửa" : "Thêm mới"} loại văn bản</h3>
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
                  onChange={(e) => setDocuments(e.target.value)}
                  value={documents}
                />
              </div>

              {(id && (
                <Link
                  to=""
                  onClick={fetchUpdateDocumentsApiList}
                  type="button"
                  className="btn btn-success m-3"
                >
                  Sửa
                </Link>
              )) || (
                <Link
                  to=""
                  onClick={fetchCreateDocumentsApiList}
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
