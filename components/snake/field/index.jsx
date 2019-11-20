import React, { useContext } from 'react';
import Context from '../../context';
import Cell from '../cell';

export default function Table(props) {
  const { height, width, snake: { body }, apples, rock } = useContext(Context);

  const getCellType = (a, b) => {
    if (body.find(({ x, y }) => x === a && y === b)) {
      return 'snake';
    } else if (apples.find(({ x, y }) => x === a && y === b)) {
      return 'apple';
    } else if (rock.find(({ x, y }) => x === a && y === b)) {
      return 'rock';
    } else {
      return 'empty';
    }
  };

  return <table className="gameField">
    <tbody>
      {new Array(height).fill(0).map((item, y) => <tr key={y}>
        {new Array(width).fill(0).map((item, x) =>
            <Cell key={x} type={getCellType(x, y)} />)}
      </tr>)}
    </tbody>
  </table>
};
