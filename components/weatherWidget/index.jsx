import React, { useState, useRef } from 'react';
import { uniqueId } from 'lodash';
import List from './list/list';

function App() {
  const cityName = useRef();
  const [cities, updateCities] = useState([]);

  const handleSubmit = () => (e) => {
    e.preventDefault();
    const { value } = cityName.current;
    // if city name is already in array
    if (cities.find(({ name }) => name === value.trim())) {
      cityName.current.value = '';
    } else if (value.trim() !== '') {
      updateCities([{ id: uniqueId(), name: value }, ...cities]);
      cityName.current.value = '';
    }
  };

  const removeWidget = (id) => {
    updateCities(cities.filter(city => city.id !== id));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit()}>
        <input className="input" type="text" ref={cityName} placeholder="Enter city name" />
        <button className="button" type="submit">Add widget</button>
      </form>
      <List cities={cities} removeWidget={removeWidget} />
      <style jsx global>{`
        .App {
          text-align: center;
        }

        .container {
          padding: 20px;
        }

        .input {
          height: 30px;
          padding-left: 5px;
          margin: 0px 10px 0px 0px;
        }

        .button {
          height: 35px;
          border-radius: 3px;
          background-color: lightgrey;
        }
        `}
      </style>
    </div>
  );
}

export default App;
