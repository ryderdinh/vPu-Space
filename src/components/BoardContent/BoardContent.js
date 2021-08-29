import "./BoardContent.scss";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { mapOrder } from "utilities/sorts";
import Column from "components/Column/Column";
import { initialData } from "actions/initialData";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";

export default function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
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
        {columns.map((column, index) => (
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
      <div className="add-new-column">
        <i className="fa fa-plus icon" />
        Add new column
      </div>
    </div>
  );
}
