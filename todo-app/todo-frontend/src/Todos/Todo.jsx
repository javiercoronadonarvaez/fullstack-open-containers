/* eslint-disable no-unused-vars */
import React from "react";

const Todo = ({ todo }) => (
  <div data-testid="todo">
    <h3>{todo.text}</h3>
    <p>{todo.done}</p>
  </div>
);

export default Todo;
