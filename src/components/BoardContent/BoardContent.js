import "./BoardContent.scss";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { mapOrder } from "utilities/sorts";
import Column from "components/Column/Column";
import { initialData } from "actions/initialData";
import { Container, Draggable } from "react-smooth-dnd";

export default function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const onColumnDrop = (propResult) => {
    console.log(propResult);
  };
  useEffect(() => {
    const boardFromDb = initialData.boards.find(
      (board) => board.id === "brd-1"
    );
    if (boardFromDb) {
      setBoard(boardFromDb);
      //? Sort column
      boardFromDb.columns.sort((a, b) => {
        return (
          boardFromDb.columnOrder.indexOf(a.id) -
          boardFromDb.columnOrder.indexOf(b.id)
        );
      });
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
              columnId={column.columnId}
            />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}
