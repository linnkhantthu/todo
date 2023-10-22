import React, { FormEvent, useState } from "react";
import { Todo } from "@/lib/models";
import TableRow from "./TableRow";
import Loading from "@/app/users/components/Loading";

function TodoListTbody({
  todoList,
  DeleteTodo,
  handleCheckBox,
  isCompletedTodos,
  isTodoLoading,
  updateTodoTitle,
}: {
  todoList: Todo[];
  DeleteTodo: any;
  handleCheckBox: any;
  isCompletedTodos: boolean;
  isTodoLoading: boolean;
  updateTodoTitle: any;
}) {
  return (
    <tbody>
      {isTodoLoading ? (
        <tr>
          <td></td>
          <td>
            <Loading />
          </td>
          <td></td>
        </tr>
      ) : (
        <>
          {todoList.map((_todoList, index) => (
            <TableRow
              key={"tr-" + (_todoList.id === undefined ? index : _todoList.id)}
              todo={_todoList}
              index={index}
              handleCheckBox={handleCheckBox}
              DeleteTodo={DeleteTodo}
              isCompletedTodos={isCompletedTodos}
              updateTodoTitle={updateTodoTitle}
            />
          ))}
        </>
      )}
    </tbody>
  );
}

export default TodoListTbody;
