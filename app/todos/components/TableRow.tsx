import { Todo } from "@/lib/models";
import React, { useState } from "react";
import TodoCheckBox from "./TodoCheckBox";
import TodoTitle from "./TodoTitle";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TableRow({
  todo,
  index,
  handleCheckBox,
  DeleteTodo,
  isCompletedTodos,
  updateTodoTitle,
}: {
  todo: Todo;
  index: number;
  handleCheckBox: any;
  DeleteTodo: (id: any) => Promise<{
    isSuccess: boolean;
    isError: boolean;
  }>;
  isCompletedTodos: boolean;
  updateTodoTitle: any;
}) {
  const [deletingId, setDeletingId] = useState<number>();
  const handleDelete = async (id: any) => {
    setDeletingId(id);
    const { isSuccess } = await DeleteTodo(id);
    if (isSuccess) {
      setDeletingId(undefined);
    }
  };
  return (
    <tr
      className={
        (!isCompletedTodos && todo.completed) ||
        (isCompletedTodos && !todo.completed)
          ? "animate-ping"
          : ""
      }
      key={"tr-" + (todo.id === undefined ? index : todo.id)}
    >
      <td>
        <span>
          <TodoCheckBox
            id={todo.id ? todo.id.toString() : ""}
            completed={todo.completed}
            handleCheckBox={handleCheckBox}
          />
        </span>
      </td>
      <td className="break-words ">
        <span>
          <TodoTitle
            id={todo.id ? todo.id.toString() : ""}
            title={todo.title ? todo.title : ""}
            updateTodoTitle={updateTodoTitle}
          />
        </span>
      </td>

      <td className="float-right" key={todo.id}>
        <div className="text-sm">
          {todo.id ? (
            <b
              key={todo.id}
              className="text text-red-600 cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              {deletingId === todo.id ? (
                <small>
                  <span className="loading loading-dots loading-sm"></span>
                </small>
              ) : (
                "x"
              )}
            </b>
          ) : (
            <LoadingSkeletonChild />
          )}
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
