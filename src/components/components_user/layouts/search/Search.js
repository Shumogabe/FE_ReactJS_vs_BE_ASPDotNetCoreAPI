import React, { Component, memo } from "react";
import "./search.css";
function Search() {
  return (
    <div className="search">
      <form className="d-flex" action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
          />
          <div className="input-group-btn">
            <button className="btn btn-outline-success" type="submit">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(Search);
