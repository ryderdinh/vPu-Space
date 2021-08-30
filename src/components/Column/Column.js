import "./Column.scss";
import React, { useEffect, useState } from "react";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";

import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "utilities/constants";

export default function Column({
  title,
  cards,
  cardOrder,
  columnId,
  ...props
}) {
  const cardsSorted = mapOrder(cards, cardOrder, "id");
  const [showModal, setShowModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const toggleShowConfirmModal = () => setShowModal(!showModal);

  const onConfirmModal = (type) => {
    console.log(type);

    switch (type) {
      case MODAL_ACTION_CONFIRM: {
        const newColumn = {
          ...props.column,
          _destroy: true,
        };
        props.onUpdateColumn(newColumn);
        break;
      }

      default:
        break;
    }
    toggleShowConfirmModal();
  };
  const handleTitleColumnChange = (e) => {
    setColumnTitle(e.target.value);
  };
  const handleTitleColumnBlur = (e) => {
    e.target.blur();
    const newColumn = {
      ...props.column,
      title: columnTitle,
    };
    props.onUpdateColumn(newColumn);
  };
  useEffect(() => {
    setColumnTitle(title);
  }, [title]);
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            value={columnTitle}
            className="content-editable"
            spellCheck="false"
            autoComplete="false"
            onClick={(e) => {
              e.target.focus();
              e.target.select();
              // document.execCommand("selectAll", false, null);
            }}
            onChange={handleTitleColumnChange}
            onBlur={handleTitleColumnBlur}
            onKeyDown={(e) => e.code === "Enter" && handleTitleColumnBlur(e)}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
      <ConfirmModal
        title="Danger zone"
        content={`
            Are you sure you want to remove
            <strong>${title}</strong>? All related
            cards will alse be removed
          `}
        show={showModal}
        onAction={onConfirmModal}
      />
    </div>
  );
}
