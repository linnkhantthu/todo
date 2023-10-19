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
}: {
  todoList: Todo[];
  DeleteTodo: any;
  handleCheckBox: any;
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
        <TableRow
          key={"tr-" + (_todoList.id === undefined ? index : _todoList.id)}
          todo={_todoList}
          index={index}
          handleCheckBox={handleCheckBox}
          DeleteTodo={DeleteTodo}
        />
      ))}
    </tbody>
  );
}

export default TodoListTbody;
