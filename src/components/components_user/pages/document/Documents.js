import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import documentsApi from "../../../../api/documentsApi";

function Documents(props) {
  const [documentsApiList, setDocumentsApiList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [total, setTotal] = useState();

  let { id } = useParams(); // Dùng để phân biệt

  useEffect(() => {
    var search = "";
    switch (id) {
      case "do-dac-va-ban-do":
        search = "Đo đạc và bản đồ";
        break;
      case "thanh-tra":
        search = "Thanh tra";
        break;
      case "moi-truong":
        search = "Môi trường";
        break;
      default:
        break;
    }
    const fetchDocumentsApiList = async () => {
      try {
        const params = { search: search, PAGE_SIZE: 10, page: 1 };
        const response = await documentsApi.getAll(params);
        setDocumentsApiList(response);
        setTotal(response.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
  }, [id]);
  useEffect(() => {
    const fetchDocumentsApiList = async () => {
      try {
        const params = { search: search, PAGE_SIZE: pageSize, page: page };
        const response = await documentsApi.getAll(params);
        setDocumentsApiList(response);
        setTotal(response.length);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
  }, [search]);

  return (
    <div className="document">
      <div className="row g-3">
        <div className="col-12">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Nhập số văn bản hoặc trích yếu để tìm kiếm"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col-2">Số văn bản</th>
                <th scope="col-5">Trích yếu</th>
                <th scope="col-2">Ngày ban hành</th>
                <th scope="col-3">Tệp văn bản</th>
              </tr>
            </thead>
            <tbody>
              {documentsApiList.map((list, index) => (
                <tr key={index}>
                  <th scope="row">{list.num_of_text}</th>
                  <td>{list.title}</td>
                  <td className="text-center">{list.createdDate}</td>
                  <td className="text-center">
                    <a href={process.env.REACT_APP_FILE_URL + "/" + list.file}>
                      <i className="fas fa-download blue"></i>
                      <span>Tải về</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Documents;
