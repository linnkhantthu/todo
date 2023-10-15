import React from "react";
import TodoCheckBox from "./TodoCheckBox";
import TodoTitle from "./TodoTitle";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import { Todo } from "@/lib/models";

function TodoListTbody({
  todoList,
  DeleteTodo,
}: {
  todoList: Todo[];
  DeleteTodo: any;
}) {
  return (
    <tbody>
      {todoList.map((_todoList, index) => (
        <tr key={"tr-" + (_todoList.id === undefined ? index : _todoList.id)}>
          <td>
            <span>
              <TodoCheckBox
                id={_todoList.id ? _todoList.id.toString() : ""}
                completed={_todoList.completed}
              />
            </span>
          </td>
          <td>
            <span>
              <TodoTitle
                id={_todoList.id ? _todoList.id.toString() : ""}
                title={_todoList.title ? _todoList.title : ""}
              />
            </span>
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
