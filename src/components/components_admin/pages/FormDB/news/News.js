import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import newsApi from "../../../../../api/newsApi";

function News(props) {
  const [newsApiList, setNewsApiList] = useState([]);

  const pageSize = props.pageSize;
  const search = props.search;
  const page = props.page;
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: 1 };
    const fetchNewsApiList = async () => {
      try {
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [pageSize]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchNewsApiList = async () => {
      try {
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [search]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchNewsApiList = async () => {
      try {
        const response = await newsApi.getAll(params);
        setNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewsApiList();
  }, [page]);
  const handleDelete = async (id) => {
    var result = window.confirm("Bạn thật sự muốn xóa?");
    if (result) {
      try {
        const option = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("admin")}`,
          },
        };
        const response = await newsApi.delete(id, option);
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <React.Fragment>
      <table className="table table-bordered" width="100%" cellSpacing={0}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </tfoot>
        <tbody>
          {newsApiList.map((list, index) => (
            <tr key={index}>
              <td>{list.title}</td>
              <td>
                <img
                  style={{ width: "250px" }}
                  src={process.env.REACT_APP_IMAGE_URL + "/" + list.image}
                  alt=""
                />
              </td>
              <td>{list.createdDate}</td>
              <td>
                <Link
                  to={"/dashboard/news/update/" + list.id}
                  className="btn btn-warning"
                  type=""
                >
                  Sửa
                </Link>{" "}
                <Link
                  to={"/dashboard/news/delete/" + list.id}
                  className="btn btn-danger"
                  type=""
                  onClick={() => handleDelete(list.id)}
                >
                  Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default News;
