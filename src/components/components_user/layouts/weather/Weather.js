import React, { memo, useEffect, useState } from "react";
import { province } from "./Provinces";
import "./weather.css";

function Weather(props) {
  const today = new Date();

  const date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  var day_name = "";

  switch (today.getDay()) {
    case 0:
      day_name = "Chủ nhật";
      break;
    case 1:
      day_name = "Thứ hai";
      break;
    case 2:
      day_name = "Thứ ba";
      break;
    case 3:
      day_name = "Thứ tư";
      break;
    case 4:
      day_name = "Thứ năm";
      break;
    case 5:
      day_name = "Thứ sáu";
      break;
    case 6:
      day_name = "Thứ bảy";
      break;
    default:
      break;
  }

  const [weather, setWeather] = useState([]);
  const [id_city, setId_city] = useState(1581130);

  useEffect(() => {
    const units = "Metric";
    const key = "58b6f7c78582bffab3936dac99c31b25";
    setTimeout(() => {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?id=" +
          id_city +
          "&units=" +
          units +
          "&appid=" +
          key
      )
        .then((response) => response.json())
        .then((json) => setWeather(json));
    }, 100);
  }, [id_city]);

  switch (weather.id) {
    case 1581130:
      weather.name = "Hà Nội";
      break;
    case 1568574:
      weather.name = "Quy Nhơn";
      break;
    case 1566083:
      weather.name = "TP.HCM";
      break;
    default:
      break;
  }

  return (
    <div className="weather">
      <div className="card">
        <div className="card-header bg-sky">
          <div className="row">
            <div className="col-md-6">
              <span className="card-title">Tỉnh/Thành phố</span>
            </div>
            <div className="col-md-6">
              <select
                className="form-control"
                value={id_city}
                onChange={(e) => {
                  setId_city(e.target.value);
                }}
              >
                {province.map((province) => (
                  <option
                    key={province.id}
                    value={province.id}
                    onChange={() => {
                      setId_city(province.id);
                    }}
                  >
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {weather.weather && (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="text-danger text-uppercase fs-5">{day_name}</p>
                <p className="weekdate">{date}</p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <img
                      className="weather-icon"
                      src={
                        "https://openweathermap.org/img/w/" +
                        weather.weather[0]["icon"] +
                        ".png"
                      }
                      alt="weather"
                    />
                  </div>
                  <div className="col-6">
                    <p className="mintemp">
                      <span id="temp">{Math.round(weather.main["temp"])}</span>℃
                    </p>
                    <p className="maxtemp">
                      <span id="humidity">{weather.main["humidity"]}</span>%
                      <i className="fa fa-tint" aria-hidden="true"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="text-primary">{weather.name}</p>
              </div>
              <div className="col-md-6">
                <p className="text-uppercase">
                  <span id="cmin">{Math.round(weather.main["temp_min"])}</span>℃
                  -{" "}
                  <span id="cmax">{Math.round(weather.main["temp_max"])}</span>℃
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Weather);
