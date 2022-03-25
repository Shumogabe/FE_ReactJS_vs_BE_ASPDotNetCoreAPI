import React, { useState, useEffect } from "react";
import newsApi from "../../../../../api/newsApi";
import { useParams } from "react-router-dom";

function NewsDetail(props) {
  const [news, setNews] = useState();
  let { id } = useParams(); // Dùng để phân biệt

  useEffect(() => {
    const fetchNewsApiList = async () => {
      try {
        const response = await newsApi.get(id);
        setNews(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, []);

  function createMarkup(html) {
    return { __html: html };
  }

  return (
    <div className="news-detail">
      <div className="row g-3">
        <div className="col-12">
          <div className="p-3 border bg-light">
            {news && (
              <div className="news-content">
                <h4 className="news-tieude">{news["title"]}</h4>
                <p className="news-tool">
                  <i className="far fa-calendar-check" />{" "}
                  <span id="publish-date">
                    <em>{news["createdDate"]}</em>
                  </span>
                </p>{" "}
                <img
                  // style={{ width: "100%" }}
                  className="rounded mx-auto d-block"
                  src={process.env.REACT_APP_IMAGE_URL + "/" + news.image}
                  alt=""
                />
                <p className="news-tomtat" id="idTomTat">
                  {news["description"]}
                </p>
                <p
                  className="news-noidung"
                  dangerouslySetInnerHTML={createMarkup(news["content"])}
                ></p>
                {/* <p className="news-nguontin">CTTĐT</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
