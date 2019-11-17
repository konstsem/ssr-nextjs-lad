import React from 'react';
import Widget from '../widget/widget';

function List(props) {
  const { cities, removeWidget } = props;
  return cities.map(({ id, name })=> <Widget cityName={name} id={id} key={id} removeWidget={removeWidget} />)
};

export default List;
