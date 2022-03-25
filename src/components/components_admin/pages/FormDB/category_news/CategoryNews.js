import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import categories_NewsApi from "../../../../../api/categories_NewsApi";

function CategoryNews(props) {
  const [categoryNewsApiList, setCategoryNewsApiList] = useState([]);
  const navigate = useNavigate();

  const pageSize = props.pageSize;
  const search = props.search;
  const page = props.page;
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: 1 };
    const fetchCategoryNewsApiList = async () => {
      try {
        const response = await categories_NewsApi.getAll(params);
        setCategoryNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryNewsApiList();
  }, [pageSize]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchCategoryNewsApiList = async () => {
      try {
        const response = await categories_NewsApi.getAll(params);
        setCategoryNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryNewsApiList();
  }, [search]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchCategoryNewsApiList = async () => {
      try {
        const response = await categories_NewsApi.getAll(params);
        setCategoryNewsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryNewsApiList();
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
        const response = await categories_NewsApi.delete(id, option);
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
            <th>Nội dung</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Nội dung</th>
            <th>Thao tác</th>
          </tr>
        </tfoot>
        <tbody>
          {categoryNewsApiList.map((list, index) => (
            <tr key={index}>
              <td>{list.title}</td>
              <td>
                <Link
                  to={"/dashboard/category-news/update/" + list.id}
                  className="btn btn-warning"
                  type=""
                >
                  Sửa
                </Link>{" "}
                <Link
                  to={"/dashboard/category-news/delete/" + list.id}
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

export default CategoryNews;
