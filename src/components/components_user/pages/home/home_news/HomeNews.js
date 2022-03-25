import React, { useState, useEffect } from "react";
import newsApi from "../../../../../api/newsApi";

function HomeNews(props) {
  const [newsApiList, setNewsApiList] = useState([]);

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const params = { search: "Tin hoạt động", PAGE_SIZE: 10, page: 1 };
        const response = await newsApi.getAll(params);
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
      <div className="card bg-green">
        <div className="card-header bg-hotnew text-center">Tin nổi bật</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              {newsApiList.map((list, index) => (
                <div key={index} className="col-12">
                  <a target="_blank" href={"/news-detail/" + list.id} alt="">
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

export default HomeNews;
