import React, { useEffect, useState } from "react";
import newsApi from "../../../../api/newsApi";
import documentsApiApi from "../../../../api/documentsApi";
import categories_NewsApi from "../../../../api/categories_NewsApi";
import categories_DocumentsApi from "../../../../api/categories_DocumentsApi";
import questionsApi from "../../../../api/questionsApi";

function Dashboard(props) {
  const [newsApiList, setNewsApiList] = useState([]);
  const [documentsApiList, setDocumentsApiList] = useState([]);
  const [categoryNewsApiList, setCategoryNewsApiList] = useState([]);
  const [categoryDocumentsApiList, setCategoryDocumentsApiList] = useState([]);
  const [questionsApiList, setQuestionsApiList] = useState([]);

  useEffect(() => {
    const params = { PAGE_SIZE: 1000000000, page: 1 };
    const fetchAPIsList = async () => {
      try {
        const responseNews = await newsApi.getAll(params);
        setNewsApiList(responseNews);
        const responseDocument = await documentsApiApi.getAll(params);
        setDocumentsApiList(responseDocument);
        const responseCategoryNews = await categories_NewsApi.getAll(params);
        setCategoryNewsApiList(responseCategoryNews);
        const responseCategoryDocuments = await categories_DocumentsApi.getAll(
          params
        );
        setCategoryDocumentsApiList(responseCategoryDocuments);
        const responseQuestions = await questionsApi.getAll(params);
        setQuestionsApiList(responseQuestions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPIsList();
  }, []);
  const db = [
    {
      name: "Loại tin tức",
      count: categoryNewsApiList.length,
      color: "primary",
      icon: "fas fa-clipboard",
    },
    {
      name: "Loại văn bản",
      count: categoryDocumentsApiList.length,
      color: "success",
      icon: "fas fa-archive",
    },
    {
      name: "Tin tức - sự kiện",
      count: newsApiList.length,
      color: "info",
      icon: "fas fa-file-alt",
    },
    {
      name: "Văn bản",
      count: documentsApiList.length,
      color: "warning",
      icon: "fas fa-book",
    },
    {
      name: "Hỏi đáp",
      count: questionsApiList.length,
      color: "danger",
      icon: "fas fa-bookfa-solid fa-question",
    },
  ];
  return (
    <div className="row">
      {db.map((list, index) => (
        <div key={index} className="col-xl-3 col-md-6 mb-4">
          <div
            className={
              "card border-left-" +
              list.color +
              " shadow h-100 py-2 border-bottom-" +
              list.color
            }
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div
                    className={
                      "text-xs font-weight-bold text-" +
                      list.color +
                      " text-uppercase mb-1"
                    }
                  >
                    {list.name}
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {list.count}
                  </div>
                </div>
                <div className="col-auto">
                  <i className={list.icon + " fa-2x text-gray-600"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
