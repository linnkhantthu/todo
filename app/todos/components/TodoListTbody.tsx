import { Todo } from "@/app/api/todos/route";
import React from "react";
import TodoCheckBox from "./TodoCheckBox";
import TodoTitle from "./TodoTitle";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TodoListTbody({
  todoList,
  DeleteTodo,
  isLoading,
  addTodo,
}: {
  todoList: Todo[];
  DeleteTodo: any;
  isLoading: boolean;
  addTodo: any;
}) {
  return (
    <tbody className="text-xl">
      {todoList.map((_todoList, index) => (
        <tr key={"tr-" + (_todoList.id === null ? index : _todoList.id)}>
          <td>
            <TodoCheckBox
              id={_todoList.id ? _todoList.id.toString() : ""}
              completed={_todoList.completed}
            />
          </td>
          <td>
            <TodoTitle
              id={_todoList.id ? _todoList.id.toString() : ""}
              title={_todoList.title ? _todoList.title : ""}
            />
          </td>

          <td>
            <div className="text-sm">
              {_todoList.id ? (
                <b
                  className="text text-red-600 cursor-pointer"
                  onClick={() => DeleteTodo(_todoList.id)}
                >
                  x
                </b>
              ) : (
                <LoadingSkeletonChild />
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TodoListTbody;
