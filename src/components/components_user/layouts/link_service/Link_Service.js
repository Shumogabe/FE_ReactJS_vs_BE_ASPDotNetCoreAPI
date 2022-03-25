import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Lists } from "./Link";
import "./link_service.css";

function Link_Service(props) {
  return (
    <div className="link-service">
      <div className="row">
        <div className="col-md-12">
          <table className="icon-link">
            {Lists.map((list, index) => (
              <tbody key={index}>
                <tr>
                  <td className="icon-left">
                    <a target="_blank" rel="noreferrer" href={list.link}>
                      <img alt="" src={list.image} />
                    </a>
                  </td>
                  <td className="link-right">
                    <a target="_blank" rel="noreferrer" href={list.link}>
                      {list.name}
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default memo(Link_Service);
