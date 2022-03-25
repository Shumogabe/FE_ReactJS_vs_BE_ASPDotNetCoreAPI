import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

function Dropdown(props) {
  const [list, setList] = useState([]);

  const array = props.nameArray;
  return (
    <ul className="dropdown-menu" aria-labelledby={props.id}>
      {array.map((ar, index) => (
        <li key={index}>
          <Link
            className="dropdown-item"
            to={
              props.category +
              ar.title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .replace(/\s/g, "-")
            }
          >
            {ar.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
