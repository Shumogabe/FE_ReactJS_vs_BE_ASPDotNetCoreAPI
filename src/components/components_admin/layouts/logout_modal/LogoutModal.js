import React from "react";

function LogoutModal(props) {
  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Bạn chắc chắn muốn thoát?
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Chọn "Đăng xuất" bên dưới nếu bạn thật sự muốn thoát phiên đăng
            nhập.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Bỏ qua
            </button>
            <a className="btn btn-primary" href="/login" onClick={handleLogout}>
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
