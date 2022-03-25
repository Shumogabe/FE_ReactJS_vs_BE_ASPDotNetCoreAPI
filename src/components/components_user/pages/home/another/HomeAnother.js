import React, { useState, useEffect } from "react";
import documentsApi from "../../../../../api/documentsApi";
import Branch from "./branch/Branch";

function HomeAnother(props) {
  const [newsApiList, setNewsApiList] = useState([]);

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: "", PAGE_SIZE: 10, page: 1 };
        const response = await documentsApi.getAll(params);
        setNewsApiList(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, []);
  return (
    <React.Fragment>
      <Branch />
      <div className="bg-green">
        <div className="card-header bg-hotnew text-center">Văn bản</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              {newsApiList.map((list, index) => (
                <div key={index} className="col-12">
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_FILE_URL + "/" + list.file}
                    rel="noreferrer"
                  >
                    ⫸ &nbsp; {list.title}
                  </a>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default HomeAnother;
