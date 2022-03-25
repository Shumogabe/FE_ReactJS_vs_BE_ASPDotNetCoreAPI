import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import documentsApi from "../../../../../../api/documentsApi";
import categories_DocumentsApi from "../../../../../../api/categories_DocumentsApi";

function CreateUpdate(props) {
  const [num, setNum] = useState();
  const [title, setTitle] = useState();
  const [day, setDay] = useState();
  const [file, setFile] = useState();
  const [categoryId, setCategoryId] = useState(0);

  const [category, setCategory] = useState();

  const [message, setMessage] = useState();
  const [doc, setDoc] = useState();
  const [imageSave, setImageSave] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocumentsApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 1000000000, page: 1 };
        const responseCategory = await categories_DocumentsApi.getAll(params);
        setCategory(responseCategory);
        if (id) {
          const response = await documentsApi.get(id);
          setDoc(response);
          setNum(response.num_of_text);
          setTitle(response.title);
          setFile({
            name: response.file,
          });
          setDay(response.createdDate);
          setCategoryId(response.category_Documents_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
  }, []);

  const fetchCreateDocumentsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = {
        num_of_text: num,
        title: title,
        file: file.name,
        createdDate: day,
        category_Documents_id: categoryId,
      };
      console.log(params);
      if (
        num === "" &&
        title === "" &&
        file === "" &&
        day === "" &&
        categoryId === ""
      ) {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await documentsApi.post(params, option);
        console.log(response);
        fetch(process.env.REACT_APP_API_URL + "/Documents/SaveFile", {
          method: "POST",
          body: imageSave,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("admin")}`,
          },
        }).then((result) => result.json());
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
    setNum("");
    setTitle("");
    setDay("");
    setFile("");
    setCategory(0);
  };

  const fetchUpdateDocumentsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = {
        id: id,
        num_of_text: num,
        title: title,
        file: file.name,
        createdDate: day,
        category_Documents_id: categoryId,
      };
      if (
        id === "" &&
        num === "" &&
        title === "" &&
        file === "" &&
        day === "" &&
        categoryId === ""
      ) {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await documentsApi.put(id, params, option);
        console.log(response);
        fetch(process.env.REACT_APP_API_URL + "/Documents/SaveFile", {
          method: "POST",
          body: imageSave,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("admin")}`,
          },
        }).then((result) => result.json());
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFile(file);
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    setImageSave(formData);
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h3>{id ? "Sửa" : "Thêm mới"} văn bản</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <form>
              <div className="m-3">
                <label htmlFor="num_of_text" className="form-label">
                  Loại văn bản
                </label>
                <select
                  className="form-select"
                  id="num_of_text"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="0" disabled>
                    Loại...
                  </option>
                  {category &&
                    category.map((list, index) => (
                      <option key={index} value={list.id}>
                        {list.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="m-3">
                <label htmlFor="num_of_text" className="form-label">
                  Số văn bản
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="num_of_text"
                  onChange={(e) => setNum(e.target.value)}
                  value={num}
                />
              </div>
              <div className="m-3">
                <label htmlFor="title" className="form-label">
                  Trích yếu
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="m-3">
                <label htmlFor="date" className="form-label">
                  Ngày ban hành
                </label>
                <input
                  required
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={(e) => setDay(e.target.value)}
                  value={day}
                />
              </div>
              <div className="m-3 row">
                <label htmlFor="file" className="form-label">
                  Tệp văn bản
                </label>
                {id && (
                  <div className="col-6">
                    File trước đó:
                    <a
                      href={
                        doc &&
                        (id
                          ? process.env.REACT_APP_FILE_URL + "/" + doc.file
                          : "")
                      }
                    >
                      <i className="fas fa-download blue"></i>
                      <span>Tải về: {doc && doc.file}</span>
                    </a>
                  </div>
                )}
                <div className="col-6">
                  <input
                    required
                    type="file"
                    className="form-control"
                    id="file"
                    accept=".pdf, .doc, .docx"
                    onChange={handlePreviewImage}
                  />
                </div>
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
