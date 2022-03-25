import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import categories_DocumentsApi from "../../../../../api/categories_DocumentsApi";

function CategoryDocuments(props) {
  const [categoryDocumentsApiList, setCategoryDocumentsApiList] = useState([]);

  const pageSize = props.pageSize;
  const search = props.search;
  const page = props.page;
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: 1 };
    const fetchCategoryDocumentsApiList = async () => {
      try {
        const response = await categories_DocumentsApi.getAll(params);
        setCategoryDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDocumentsApiList();
  }, [pageSize]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchCategoryDocumentsApiList = async () => {
      try {
        const response = await categories_DocumentsApi.getAll(params);
        setCategoryDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDocumentsApiList();
  }, [search]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchCategoryDocumentsApiList = async () => {
      try {
        const response = await categories_DocumentsApi.getAll(params);
        setCategoryDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDocumentsApiList();
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
        const response = await categories_DocumentsApi.delete(id, option);
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
          {categoryDocumentsApiList.map((list, index) => (
            <tr key={index}>
              <td>{list.title}</td>
              <td>
                <Link
                  to={"/dashboard/category-documents/update/" + list.id}
                  className="btn btn-warning"
                  type=""
                >
                  Sửa
                </Link>{" "}
                <Link
                  to={"/dashboard/category-documents/delete/" + list.id}
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

export default CategoryDocuments;
