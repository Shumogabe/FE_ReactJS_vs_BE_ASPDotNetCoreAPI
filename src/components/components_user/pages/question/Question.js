import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import questionsApi from "./../../../../api/questionsApi";

function Question(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [title, setTitle] = useState();
  const [question, setQuestion] = useState();

  const [error, setError] = useState();
  function isEmail(email) {
    const check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(email);
  }

  const fetchCreateQuestionsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin")}` },
      };
      const params = {
        name: name,
        email: email,
        title: title,
        question: question,
        answer: "",
      };

      if (
        name === "" ||
        email === "" ||
        title === "" ||
        question === "" ||
        !isEmail(email)
      ) {
        setError({
          title: "Gửi thất bại! Vui lòng kiểm tra lại thông tin nhập vào",
          alert: "danger",
        });
      } else {
        const response = await questionsApi.post(params, option);
        console.log(response);
        setError({ title: "Gửi thành công!", alert: "success" });
      }
    } catch (error) {
      setError({
        title: "Gửi thất bại! Vui lòng kiểm tra lại thông tin nhập vào",
        alert: "danger",
      });
      console.log(error);
    }
    setName("");
    setEmail("");
    setTitle("");
    setQuestion("");
  };

  return (
    <div className="question">
      <form>
        <div className="row g-3">
          <div className="col-md-3">
            <strong>
              Tiêu đề: <b style={{ color: "red" }}>*</b>
            </strong>
          </div>
          <div className="col-md-9">
            <input
              required
              className={
                "w-100 rounded-3 " +
                (error && error.alert === "danger"
                  ? "border-start border-5 border-danger"
                  : "")
              }
              type=""
              name=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="col-md-3">
            <strong>
              Họ và tên: <b style={{ color: "red" }}>*</b>
            </strong>
          </div>
          <div className="col-md-9">
            <input
              required
              className={
                "w-100 rounded-3 " +
                (error && error.alert === "danger"
                  ? "border-start border-5 border-danger"
                  : "")
              }
              type=""
              name=""
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="col-md-3 ">
            <strong>
              Email: <b style={{ color: "red" }}>*</b>
            </strong>
          </div>
          <div className="col-md-9">
            <input
              required
              className={
                "w-100 rounded-3 " +
                (error && error.alert === "danger"
                  ? "border-start border-5 border-danger"
                  : "")
              }
              type="email"
              name=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="col-md-3">
            <strong>
              Nội dung: <b style={{ color: "red" }}>*</b>
            </strong>
          </div>
          <div className="col-md-9">
            <CKEditor
              className="rounded-3"
              required
              editor={ClassicEditor}
              data={question === undefined ? "" : question}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor.getData());
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                // console.log(editor.getData());
                setQuestion(editor.getData());
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
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <button
              className="btn btn-primary"
              type="button"
              name=""
              onClick={fetchCreateQuestionsApiList}
            >
              Gửi
            </button>
          </div>
        </div>
      </form>
      <br />
      {error && (
        <div
          className={"alert alert-" + error["alert"] + " col-12"}
          role="alert"
        >
          {error["title"]}{" "}
        </div>
      )}
    </div>
  );
}

export default Question;
