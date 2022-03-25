import React, { useEffect, useState, memo } from "react";
import accountsApi from "../../../../api/accountsApi";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login(props) {
  document.title = "HỆ THỐNG SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG";

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [id, setId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    console.log(sessionStorage.getItem("admin") === id);
    if (sessionStorage.getItem("admin") === id) {
      console.log(1);
      navigate("/dashboard");
      window.location.reload();
    }
  }, [id]);
  const fetchAccountApi = async () => {
    try {
      const params = { username: username, password: password };
      const response = await accountsApi.postLogin(params);
      // console.log(response);
      if (response.success) {
        sessionStorage.setItem("admin", response.data);
        // console.log(sessionStorage.getItem("admin"));
        setId(response.data);
        // window.location.reload();
      } else {
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="form">
          <img
            className="rounded mx-auto d-block"
            src="/images/icons/monre-logo.png"
            alt=""
          />
          <h2>Đăng nhập hệ thống</h2>
          <div className="input-group">
            <input
              required
              id="username"
              className="form-control"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <span className="input-group-text" id="addon-wrapping">
              <label htmlFor="username">
                <i className="fa fa-user"></i>
              </label>
            </span>
          </div>
          <div className="input-group">
            <input
              required
              id="password"
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span className="input-group-text" id="addon-wrapping">
              <label htmlFor="password">
                <i className="fa fa-lock"></i>{" "}
              </label>
            </span>
          </div>

          <button
            onClick={() => {
              fetchAccountApi();
            }}
            type="submit"
            className="btn submit"
          >
            Đăng nhập
          </button>
        </div>
        <div className="d-grid gap-2 col-5 mx-auto mt-2">
          <Link to="/" className="btn btn-primary">
            Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
