import React, { FormEvent, useState } from "react";
import TodoCheckBox from "./TodoCheckBox";
import TodoTitle from "./TodoTitle";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import { Todo } from "@/lib/models";
import TableRow from "./TableRow";

function TodoListTbody({
  todoList,
  DeleteTodo,
  handleCheckBox,
  isCompletedTodos,
}: {
  todoList: Todo[];
  DeleteTodo: any;
  handleCheckBox: any;
  isCompletedTodos: boolean;
}) {
  return (
    <tbody>
      {todoList.map((_todoList, index) => (
        <TableRow
          key={"tr-" + (_todoList.id === undefined ? index : _todoList.id)}
          todo={_todoList}
          index={index}
          handleCheckBox={handleCheckBox}
          DeleteTodo={DeleteTodo}
          isCompletedTodos={isCompletedTodos}
        />
      ))}
    </tbody>
  );
}

export default TodoListTbody;
