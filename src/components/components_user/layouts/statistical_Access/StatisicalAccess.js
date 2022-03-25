import React, { useEffect, useState, memo } from "react";
import accessessApi from "../../../../api/accessessApi";
import "./statisicalaccess.css";

function StatisicalAccess(props) {
  const [access, setAccess] = useState();

  useEffect(() => {
    const fetchAccesssApiList = async () => {
      try {
        const responseGet = await accessessApi.getAll();
        const res = responseGet[0]["count"];
        const params = { id: 1, count: res + 1 };
        const responseUpdate = await accessessApi.put("1", params);

        setAccess(JSON.parse(responseUpdate["config"]["data"])["count"]);
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(fetchAccesssApiList, 1500);
  }, []);

  return (
    <div className="statisical-access">
      <div className="card bg-green">
        <div className="card-header bg-green">Thống kê truy cập</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row">
              <div className="col-8">
                <i className="fa fa-user"></i>&nbsp; Lượng truy cập
              </div>
              <div className="col-4 text-end">{access && access}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(StatisicalAccess);
