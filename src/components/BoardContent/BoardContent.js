import "./BoardContent.scss";
import React, { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import { mapOrder } from "utilities/sorts";
import Column from "components/Column/Column";
import { initialData } from "actions/initialData";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import {
  Button,
  Col,
  Container as BootstrapContainer,
  Form,
  Row,
} from "react-bootstrap";

export default function BoardContent() {
  //? States
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  //? Refs
  const newColumnInputRef = useRef();

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    setColumns(newColumns);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
  };
  const onCardDrop = (columnId, itemResult) => {
    if (itemResult.removedIndex !== null || itemResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, itemResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      setColumns(newColumns);
    }
  };
  const addNewColumn = () => {
    const newColumnData = {
      id: Math.random().toString(36).substr(2, 7), //random characters, will remove when we implement code api
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnData);
    setColumns(newColumns);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setNewColumnTitle("");
    setOpenNewColumnForm(false);
  };

  //? Effects
  useEffect(() => {
    const boardFromDb = initialData.boards.find(
      (board) => board.id === "brd-1"
    );
    if (boardFromDb) {
      setBoard(boardFromDb);
      // //? Sort column
      setColumns(mapOrder(boardFromDb.columns, boardFromDb.columnOrder, "id"));
    }
  }, []);
  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  return (
    <div className="board-contents">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
        getChildPayload={(index) => columns[index]}
      >
        {columns.map((column) => (
          <Draggable key={column.id}>
            <Column
              title={column.title}
              cards={column.cards}
              cardOrder={column.cardOrder}
              columnId={column.id}
              onCardDrop={onCardDrop}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="bootstrap-container">
        {!openNewColumnForm ? (
          <Row>
            <Col
              className="add-new-column"
              onClick={() => {
                setOpenNewColumnForm(!openNewColumnForm);
              }}
            >
              <i className="fa fa-plus icon" />
              Add new column
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                value={newColumnTitle}
                placeholder="Enter column title"
                className="input-enter-new-column"
                ref={newColumnInputRef}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyPress={(e) => e.code === "Enter" && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="cancel-new-column"
                onClick={() => {
                  setOpenNewColumnForm(!openNewColumnForm);
                  setNewColumnTitle("");
                }}
              >
                <i className="fa fa-trash icon" />
              </Button>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}
