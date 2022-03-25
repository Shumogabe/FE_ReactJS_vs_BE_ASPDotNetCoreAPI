import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import documentsApi from "../../../../../api/documentsApi";

function Documents(props) {
  const [documentsApiList, setDocumentsApiList] = useState([]);

  const pageSize = props.pageSize;
  const search = props.search;
  const page = props.page;
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: 1 };
    const fetchDocumentsApiList = async () => {
      try {
        const response = await documentsApi.getAll(params);
        setDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
  }, [pageSize]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchDocumentsApiList = async () => {
      try {
        const response = await documentsApi.getAll(params);
        setDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
  }, [search]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchDocumentsApiList = async () => {
      try {
        const response = await documentsApi.getAll(params);
        setDocumentsApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocumentsApiList();
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
        const response = await documentsApi.delete(id, option);
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
            <th>Số ký hiệu</th>
            <th>Nội dung</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Số ký hiệu</th>
            <th>Nội dung</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </tfoot>
        <tbody>
          {documentsApiList.map((list, index) => (
            <tr key={index}>
              <td>{list.num_of_text}</td>
              <td>{list.title}</td>
              <td>{list.createdDate}</td>
              <td>
                <Link
                  to={"/dashboard/documents/update/" + list.id}
                  className="btn btn-warning"
                  type=""
                >
                  Sửa
                </Link>{" "}
                <Link
                  to={"/dashboard/documents/delete/" + list.id}
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

export default Documents;
