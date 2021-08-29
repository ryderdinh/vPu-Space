import "./Column.scss";
import React from "react";
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";

export default function Column({
  title,
  cards,
  cardOrder,
  columnId,
  ...props
}) {
  const cardsSorted = mapOrder(cards, cardOrder, "id");

  return (
    <div className="column">
      <header className="column-drag-handle">{title}</header>
      <div className="card-list">
        <Container
          // onDragStart={(e) => console.log("drag started", e)}
          // onDragEnd={(e) => console.log("drag end", e)}
          // onDragEnter={() => {
          //   console.log("drag enter:", columnId);
          // }}
          // onDragLeave={() => {
          //   console.log("drag leave:", columnId);
          // }}
          // onDropReady={(p) => console.log("Drop ready: ", p)}
          groupName="col"
          onDrop={(dropResult) => props.onCardDrop(columnId, dropResult)}
          getChildPayload={(index) => cardsSorted[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          dropPlaceholderAnimationDuration={300}
        >
          {cardsSorted.map((card) => (
            <Draggable key={card.id}>
              <Card dataCard={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" />
          Add task 😐
        </div>
      </footer>
    </div>
  );
}
