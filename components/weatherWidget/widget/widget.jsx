import React, { useState, useEffect } from 'react';
import axios from 'axios';

const timeInterval = 10000;

function Widget(props) {
  const { cityName, id, removeWidget } = props;
  const [name, setName] = useState();
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const options = {
    method: 'get',
    url: 'http://openweathermap.org/data/2.5/weather',
    params: {
      q: cityName,
      appid: 'b6907d289e10d714a6e88b30761fae22'
    },
  };

  const update = () =>
    axios(options)
      .then((res) => {
        const { name, main } = res.data;
        const { temp, humidity } = main;
        setName(name);
        setTemp(temp)
        setHumidity(humidity);
      })
      .catch((err) => {
        console.error(err);
      });

  update();
  useEffect(() => {
    const updateWidgetData = setInterval(update, timeInterval);
    return () => clearInterval(updateWidgetData);
  });

  return (
    <div className="widget">
      <span>{name}</span>
      <button className="close" onClick={() => removeWidget(id)}>x</button>
      <p>Temp: {Math.floor(temp)} &#8451;</p>
      <p>Humidity: {humidity} %</p>
      <style jsx global>{`
        .widget {
          float: left;
          margin: 20px 1px 0px;
          padding: 10px;
          width: 170px;
          border-radius: 10px;
          border: 1px solid black;
        }

        .close {
          float: right;
        }
        `}
      </style>
    </div>
  );
};

export default Widget;
