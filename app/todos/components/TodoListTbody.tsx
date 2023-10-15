import React, { FormEvent, useState } from "react";
import TodoCheckBox from "./TodoCheckBox";
import TodoTitle from "./TodoTitle";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import { Todo } from "@/lib/models";
import Loading from "@/app/users/components/Loading";

function TodoListTbody({
  todoList,
  DeleteTodo,
}: {
  todoList: Todo[];
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
          <td className="break-words ">
            <span>
              <TodoTitle
                id={_todoList.id ? _todoList.id.toString() : ""}
                title={_todoList.title ? _todoList.title : ""}
              />
            </span>
          </td>

          <td className="float-right" key={_todoList.id}>
            <div className="text-sm">
              {_todoList.id ? (
                <b
                  key={_todoList.id}
                  className="text text-red-600 cursor-pointer"
                  onClick={() => handleDelete(_todoList.id)}
                >
                  {isAdding === _todoList.id ? (
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
      ))}
    </tbody>
  );
}

export default TodoListTbody;
