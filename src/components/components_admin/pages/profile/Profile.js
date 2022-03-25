import React from "react";
import { parseJwt } from "../../layouts/parseJWT";
import "./profile.css";

function Profile(props) {
  const account = parseJwt(sessionStorage.getItem("admin"));
  console.log(account);
  return (
    <div className="profile page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      {" "}
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User_Profile_Image"
                      />{" "}
                    </div>
                    <h1 className="f-w-600">{account.unique_name}</h1>
                    <h3>Level: {account.Level}</h3>{" "}
                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Thông tin
                    </h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{account.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Số điện thoại</p>
                        <h6 className="text-muted f-w-400">{account.Phone}</h6>
                      </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      Công việc
                    </h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Chức vụ</p>
                        <h6 className="text-muted f-w-400">Quản trị viên</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phòng ban</p>
                        <h6 className="text-muted f-w-400">
                          Phòng Phát triển ứng dụng
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
