import "./Column.scss";
import React from "react";
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sorts";

export default function Column({ title, cards, cardOrder }) {
  const cardsSorted = mapOrder(cards, cardOrder, "id");
  return (
    <div className="column">
      <header>{title}</header>
      <ul className="card-list">
        {cardsSorted.map((card) => (
          <Card key={card.id} dataCard={card} />
        ))}
      </ul>
      <footer>Add task 😐</footer>
    </div>
  );
}
