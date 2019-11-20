import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import MainMenu from '../mainMenu';
import Context from '../context';
import Field from './field';

function Game(props) {
  const vectors = {
    start: { name: 'start', x: 0, y: 0 },
    up: { name: 'up', x: 0, y: -1 },
    right: { name: 'right', x: 1, y: 0 },
    down: { name: 'down', x: 0, y: 1 },
    left: { name: 'left', x: -1, y: 0 },
  };

  const width = 20;
  const height = 20;
  const startCoord = { x: 10, y: 10 };
  const apple = [
    { x: 1, y: 4 },
    { x: 3, y: 8 },
    { x: 8, y: 18 },
    { x: 15, y: 17 },
  ];
  const rock = [
    { x: 17, y: 5 },
    { x: 4, y: 11 },
    { x: 2, y: 10 },
    { x: 8, y: 4 },
    { x: 12, y: 15 },
  ];

  const [snake, setSnake] = useState({
    body: [startCoord],
    vector: vectors['start'],
  });
  const [apples, setApples] = useState(apple);

  const isRock = ({ x, y }) => rock.some((item) => item.x === x && item.y === y);
  const isApple = ({ x, y }) => apples.some((item) => item.x === x && item.y === y);
  const isSnake = ({ x, y }) => snake.body.some((item) => item.x === x && item.y === y);

  const isFail = newHead =>
    newHead.x < 0 || newHead.y < 0 || newHead.x === width || newHead.y === height || isRock(newHead) || isSnake(newHead);

  const move = () => {
    if (snake.vector.name === 'start') {
      return;
    }
    setSnake(({ body, vector }) => {
      const newHead = { x: body[0].x + vector.x, y: body[0].y + vector.y };
      if (isFail(newHead)) {
        console.log('fail');
        Router.push({ pathname: '/' });
      }

      if (!isApple(newHead)) {
        const snakeWithoutTail = body.slice(0, body.length - 1);
         return {
          body: [newHead, ...snakeWithoutTail],
          vector,
        };
      } else {
        // change apple array
        setApples(apples.filter((item) =>
          item.x !== newHead.x && item.y !== newHead.y));
        return {
          body: [newHead, ...body],
          vector,
        };
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(move, 1000);
    return () => clearInterval(intervalId);
  });

  const handleUp = (e) => {
    e.preventDefault();
    if (snake.vector.name !== 'up' || snake.vector.name !== 'down') {
      console.log('up');
      setSnake({
        body: snake.body,
        vector: vectors.up,
      });
    }
  };

  const handleRight = (e) => {
    e.preventDefault();
    if (snake.vector.name !== 'right' || snake.vector.name !== 'left') {
      console.log('right');
      setSnake({
        body: snake.body,
        vector: vectors.right,
      })
    }
  };

  const handleDown = (e) => {
    e.preventDefault();
    if (snake.vector.name !== 'down' || snake.vector.name !== 'up') {
      console.log('down');
      setSnake({
        body: snake.body,
        vector: vectors.down,
      })
    }
  };

  const handleLeft = (e) => {
    e.preventDefault();
    if (snake.vector.name !== 'left' || snake.vector.name !== 'right') {
      console.log('left');
      setSnake({
        body: snake.body,
        vector: vectors.left,
      })
    }
  };

  return (
    <div className="container">
      <MainMenu />
      <div className="game">
      <Context.Provider value={{
        width,
        height,
        snake,
        apples,
        rock,
      }}>
        <Field />
        <div className="buttons">
         <button onClick={handleUp}>Up</button>
         <button onClick={handleRight}>Right</button>
         <button onClick={handleDown}>Down</button>
         <button onClick={handleLeft}>Left</button>
        </div>
      </Context.Provider>
      </div>
      <style jsx>{`
        .game {
        margin: 20px;
        }

        button {
          margin: 20px 38px;
          background: orange;
        }
        `}
      </style>
    </div>
  );
}

export default Game;
