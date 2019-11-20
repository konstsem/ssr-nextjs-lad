import React from 'react';

function Cell(props) {
  return (
    <>
      <td className={props.type}>
        <div />
      </td>
      <style jsx>{`
        td {
          width: 20px;
        }

        div {
          height: 20px;
        }

        .snake {
          background: yellow;
        }

        .empty {
          background: grey;
        }

        .apple {
          background: red;
        }

        .rock {
          background: black;
        }
        `}
      </style>
    </>
  );
}

export default Cell;
