import React from "react";
import { Link } from "react-router-dom";
import Index_admin from "../../../components_admin/Index_admin";

import "./login.css";
function Login(props) {
  return (
    <Link className="button-login btn btn-primary" to="/login">
      <i className="fas fa-sign-in-alt"></i>&nbsp;Login
    </Link>
  );
}

export default Login;
