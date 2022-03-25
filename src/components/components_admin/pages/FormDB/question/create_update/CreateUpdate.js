import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import questionsApi from "./../../../../../../api/questionsApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import emailjs from "emailjs-com";

function CreateUpdate(props) {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const [message, setMessage] = useState();
  const [question1, setQuesstion1] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryNewsApiList = async () => {
      try {
        const response = await questionsApi.get(id);
        setQuestion(response);
      } catch (error) {
        console.log(error);
      }
    };
    id && fetchCategoryNewsApiList();
  }, []);

  const fetchUpdateNewsApiList = async () => {
    try {
      const option = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("admin")}` },
      };
      const params = {
        id: id,
        name: question.name,
        email: question.email,
        title: question.title,
        question: question.question,
        answer: answer,
      };
      if (!answer) {
        setMessage({ title: "Thất bại!", alert: "danger" });
      } else {
        const response = await questionsApi.put(id, params, option);
        console.log(response);
        setMessage({ title: "Thành công!", alert: "success" });
      }
    } catch (error) {
      setMessage({ title: "Thất bại!", alert: "danger" });
      console.log(error);
    }
  };
  function createMarkup(html) {
    return { __html: html };
  }

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_b8xbpj5",
        "template_376xkrn",
        e.target,
        "47TXRV59WbnIgJD94"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h3>Trả lời câu hỏi</h3>
        </div>
        {question && (
          <div className="card-body">
            <div className="table-responsive">
              <div className="row">
                <div className="col-3">
                  <p>
                    <span className="text-dark h4">Họ tên:</span>{" "}
                    {question.name}
                  </p>
                </div>
                <div className="col-3 border-start border-5 border-dark">
                  <p>
                    {" "}
                    <span className="text-dark h4">Email: </span>{" "}
                    {question.email}
                  </p>
                </div>
                <div className="col-6 border-start border-5 border-dark">
                  <span className="text-dark h4">Tiêu đề: </span>{" "}
                  {question.title}
                </div>
              </div>
              <br />
              <div className="row border-top border-5 border-dark">
                <div className="col-12">
                  <span className="text-dark h4">Câu hỏi:</span>{" "}
                  <p
                    id="question"
                    className="news-noidung"
                    dangerouslySetInnerHTML={createMarkup(question.question)}
                  ></p>
                </div>
              </div>
              <form onSubmit={sendEmail}>
                <React.Fragment>
                  <input type="hidden" name="name" value={question.name} />
                  <input type="hidden" name="title" value={question.title} />
                  <input
                    type="hidden"
                    name="question"
                    value={question.question}
                  />
                  <input type="hidden" name="email" value={question.email} />
                  <textarea
                    id="answer"
                    name="answer"
                    style={{ display: "none" }}
                    type="hidden"
                    value={question.answer}
                  />
                </React.Fragment>

                <div className="m-3">
                  <label className="form-label">
                    <span className="text-dark h4">Nhập câu trả lời</span>{" "}
                  </label>
                  <CKEditor
                    className="rounded-3"
                    required
                    editor={ClassicEditor}
                    data={question.answer === undefined ? "" : question.answer}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      // console.log("Editor is ready to use!", editor.getData());
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // console.log({ event, editor, data });
                      // console.log(editor.getData());
                      setAnswer(editor.getData());
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
                <button
                  onClick={fetchUpdateNewsApiList}
                  type="submit"
                  className="btn btn-success m-3"
                >
                  Trả lời
                </button>
              </form>
            </div>
          </div>
        )}
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
