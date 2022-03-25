import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import newsApi from "../../../../../../api/newsApi";
import categories_NewsApi from "./../../../../../../api/categories_NewsApi";

function CreateUpdate(props) {
  const today = new Date();

  const [news, setNews] = useState();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [day, setDay] = useState();

  const [file, setFile] = useState();
  const [categoryId, setCategoryId] = useState(0);

  const [category, setCategory] = useState();
  const [message, setMessage] = useState();

  const [imageSave, setImageSave] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setFile("");
      setDay(
        today.getFullYear() +
          "-" +
          (today.getMonth() < 10
            ? "0" + (today.getMonth() + 1)
            : today.getMonth() + 1) +
          "-" +
          today.getDate()
      );
    }
    const fetchCategoryNewsAndNewsApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 1000000000, page: 1 };
        const responseCategory = await categories_NewsApi.getAll(params);
        setCategory(responseCategory);
        if (id) {
          const response = await newsApi.get(id);
          console.log(response);
          setNews(response);
          setCategoryId(response.category_News_id);
          setTitle(response.title);
          setDescription(response.description);
          setContent(response.content);
          setDay(response.CreateUpdate);
          setFile({
            name: response.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryNewsAndNewsApiList();
  }, []);

  const fetchCreateNewsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = {
        title: title,
        description: description,
        content: content,
        image: file.name,
        createdDate: day,
        category_News_id: categoryId,
      };
      if (
        title === "" &&
        description === "" &&
        content === "" &&
        file === "" &&
        day === "" &&
        categoryId === ""
      ) {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await newsApi.post(params, option);
        console.log(response);
        fetch(process.env.REACT_APP_API_URL + "/News/SaveFile", {
          method: "POST",
          body: imageSave,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("admin")}`,
          },
        }).then((result) => result.json());
        // .then((data) => {
        //   this.setState({ image: data });
        // });
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
    setCategoryId(0);
    setTitle("");
    setDescription("");
    setContent("");
    setDay("");
    setFile("");
  };

  const fetchUpdateNewsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = {
        id: id,
        title: title,
        description: description,
        content: content,
        image: file.name,
        createdDate: day,
        category_News_id: categoryId,
      };
      console.log(params);
      if (
        id === "" &&
        title === "" &&
        description === "" &&
        content === "" &&
        file === "" &&
        day === "" &&
        categoryId === ""
      ) {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await newsApi.put(id, params, option);
        console.log(response);
        fetch(process.env.REACT_APP_API_URL + "/News/SaveFile", {
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
    // console.log(file);
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    setImageSave(formData);
  };

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h3>{id ? "Sửa" : "Thêm mới"} tin tức</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <form>
              <div className="m-3">
                <label htmlFor="num_of_text" className="form-label">
                  Loại tin tức
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
                <label htmlFor="title" className="form-label">
                  Tiêu đề
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
                <label htmlFor="des" className="form-label">
                  Mô tả
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="des"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="m-3">
                <label htmlFor="content" className="form-label">
                  Nội dung
                </label>
                {/* <textarea
                  required
                  type="text"
                  className="form-control"
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                /> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor.getData());
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log({ event, editor, data });
                    // console.log(editor.getData());
                    setContent(editor.getData());
                  }}
                  onBlur={(event, editor) => {
                    // console.log(editor.getData());
                    // console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log(editor.getData());
                    // console.log("Focus.", editor);
                  }}
                />
              </div>
              <div className="m-3">
                <label htmlFor="date" className="form-label">
                  Ngày đăng tin
                </label>
                <input
                  required
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={(e) => setDay(e.target.value)}
                  value={day}
                  max={day}
                  min={day}
                />
              </div>
              <div className="m-3 row">
                <label htmlFor="file" className="form-label col-12">
                  Ảnh bìa
                </label>
                {id && (
                  <React.Fragment>
                    <span>Ảnh trước</span>
                    <div className="col-6">
                      <img
                        src={
                          news &&
                          (id
                            ? process.env.REACT_APP_IMAGE_URL + "/" + news.image
                            : "")
                        }
                        alt=""
                        className="col-9 border border-5 rounded-3"
                      />
                    </div>
                  </React.Fragment>
                )}
                <div className={id ? "col-6" : ""}>
                  <input
                    required
                    type="file"
                    className="form-control col-3"
                    id="file"
                    // accept=".png, .gif, .jpg, .jpeg"
                    accept="image/*"
                    onChange={handlePreviewImage}
                  />
                  {file && (
                    <img
                      src={file.preview}
                      alt=""
                      className="col-9 border border-5 rounded-3"
                    />
                  )}
                </div>
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
