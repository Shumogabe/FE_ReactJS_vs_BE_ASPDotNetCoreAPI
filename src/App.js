import React, { useEffect, useState, memo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Index_user from "./components/components_user/Index_user";
import Login from "./components/components_admin/pages/login/Login";
import Index_admin from "./components/components_admin/Index_admin";
import "./App.css";

function App() {
  const [login] = useState(() => {
    if (sessionStorage.getItem("admin")) {
      return false;
    } else {
      return true;
    }
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/*" exact element={<Index_user />} />
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/dashboard/*"
          exact
          element={login ? <Navigate to="/login" /> : <Index_admin />}
        />
      </Routes>
      {/* <Index_admin /> */}
    </div>
  );
}

export default App;
