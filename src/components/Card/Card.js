import "./Card.scss";

import React from "react";

export default function Card({ dataCard }) {
  return (
    <div className="card-item">
      {dataCard.cover ? (
        <>
          <img
            src={dataCard.cover}
            className="card-cover"
            alt="thẻ"
            onMouseDown={(e) => e.preventDefault}
          />
          {dataCard.title}
        </>
      ) : (
        dataCard.title
      )}
    </div>
  );
  // return <li className="task-item">Add new task to work on below</li>;
}
