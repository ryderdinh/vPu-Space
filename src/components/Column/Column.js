import "./Column.scss";
import React from "react";
import Task from "components/Task/Task";

export default function Column() {
  return (
    <div className="column">
      <header>Brainstorms</header>
      <ul className="task-list">
        <Task />
      </ul>
      <footer>Add task 😐</footer>
    </div>
  );
}
