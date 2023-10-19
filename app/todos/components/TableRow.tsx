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
}: {
  todo: Todo;
  index: number;
  handleCheckBox: any;
  DeleteTodo: any;
}) {
  const [isAdding, setIsAdding] = useState<number>();
  const handleDelete = async (id: any) => {
    setIsAdding(id);
    if (await DeleteTodo(id)) {
      setIsAdding(undefined);
    }
  };
  return (
    <tr
      className={todo.completed ? "animate-ping" : ""}
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
              {isAdding === todo.id ? (
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
