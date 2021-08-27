import "./Card.scss";

import React from "react";
import { isNull } from "lodash";

export default function Card({ dataCard }) {
  return (
    <li className="card-item">
      {dataCard.cover ? (
        <>
          <img src={dataCard.cover} className="card-cover" alt="thẻ" />
          {dataCard.title}
        </>
      ) : (
        dataCard.title
      )}
    </li>
  );
  // return <li className="task-item">Add new task to work on below</li>;
}
