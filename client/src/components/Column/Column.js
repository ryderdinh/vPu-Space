import "./Column.scss";
import React, { useEffect, useRef, useState } from "react";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";

import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { Button, Dropdown, Form } from "react-bootstrap";
import { MODAL_ACTION_CONFIRM } from "utilities/constants";
import cloneDeep from "lodash.clonedeep";

export default function Column({
  title,
  cards,
  cardOrder,
  columnId,
  ...props
}) {
  //? State
  const cardsSorted = mapOrder(cards, cardOrder, "_id");
  const [showModal, setShowModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [openNewCard, setOpenNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  //? Ref
  const newCardRef = useRef(null);

  //? Action
  const toggleShowConfirmModal = () => setShowModal(!showModal);
  const toggleOpenNewCard = () => setOpenNewCard(!openNewCard);

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
  const addNewCard = () => {
    if (!newCardTitle) {
      newCardRef.current.focus();
      return;
    }
    const newCardData = {
      id: "cd-" + Math.random().toString(36).substr(2, 7), //random characters, will remove when we implement code api
      boardId: props.column.boardId,
      columnId,
      title: newCardTitle.trim(),
      cover: null,
    };
    const newColumn = cloneDeep(props.column);
    newColumn.cardOrder.push(newCardData._id);
    newColumn.cards.push(newCardData);

    props.onAddNewCardToColumn(newColumn);
    setNewCardTitle("");
    setOpenNewCard(!openNewCard);
  };

  //? Effect
  useEffect(() => {
    setColumnTitle(title);
  }, [title]);

  useEffect(() => {
    if (newCardRef && newCardRef.current) {
      newCardRef.current.focus();
      newCardRef.current.select();
    }
  }, [openNewCard]);

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
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
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
            <Draggable key={card._id}>
              <Card dataCard={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCard && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter card title..."
              className="textarea-enter-new-card"
              value={newCardTitle}
              ref={newCardRef}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyPress={(e) => e.code === "Enter" && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {!openNewCard ? (
          <div className="footer-actions" onClick={toggleOpenNewCard}>
            <i className="fa fa-plus icon" />
            Add another card
          </div>
        ) : (
          <div className="add-new-card-action">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="cancel-icon"
              onClick={toggleOpenNewCard}
            >
              <i className="fa fa-trash icon" />
            </Button>
          </div>
        )}
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
