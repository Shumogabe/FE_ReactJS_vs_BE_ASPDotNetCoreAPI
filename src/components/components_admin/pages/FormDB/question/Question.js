import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import questionsApi from "../../../../../api/questionsApi";
import "./question.css";

function Question(props) {
  const [questionsApisApiList, setQuestionsApisApiList] = useState([]);

  const pageSize = props.pageSize;
  const search = props.search;
  const page = props.page;
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: 1 };
    const fetchQuestionsApiList = async () => {
      try {
        const response = await questionsApi.getAll(params);
        setQuestionsApisApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestionsApiList();
  }, [pageSize]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchQuestionsApiList = async () => {
      try {
        const response = await questionsApi.getAll(params);
        setQuestionsApisApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestionsApiList();
  }, [search]);
  useEffect(() => {
    const params = { search: search, PAGE_SIZE: pageSize, page: page };
    const fetchQuestionsApiList = async () => {
      try {
        const response = await questionsApi.getAll(params);
        setQuestionsApisApiList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestionsApiList();
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
        const response = await questionsApi.delete(id, option);
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
            <th>Trạng thái</th>
            <th>Tiêu đề</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Trạng thái</th>
            <th>Tiêu đề</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </tfoot>
        <tbody>
          {questionsApisApiList.map((list, index) => (
            <tr key={index}>
              {list.answer === null ? (
                <td className="bg-info text-white">Chưa trả lời</td>
              ) : (
                <td className="bg-success text-white">Đã trả lời</td>
              )}

              <td>{list.title}</td>
              <td>{list.name}</td>
              <td>{list.email}</td>
              <td>
                <Link
                  to={"/dashboard/questions/update/" + list.id}
                  className="btn btn-warning"
                  type=""
                >
                  Trả lời
                </Link>{" "}
                <Link
                  to={"/dashboard/questions/delete/" + list.id}
                  className="btn btn-danger"
                  type=""
                  onClick={() => handleDelete(list.id)}
                >
                  Xóa
                </Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Question;
