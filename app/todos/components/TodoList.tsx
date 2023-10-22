"use client";

import React, { FormEvent, useState } from "react";
import AddTodo from "./AddTodo";
import TodoListTbody from "./TodoListTbody";
import { Todo } from "@/lib/models";
import Loading from "@/app/users/components/Loading";

const TodoList = ({
  todos,
  isLoading,
  isCompletedTodos,
  handleCompletedTodos,
  addTodo,
  DeleteTodo,
  handleCheckBox,
  isTodoLoading,
  updateTodoTitle,
}: {
  todos: Todo[];
  isLoading: boolean;
  isCompletedTodos: boolean;
  handleCompletedTodos: any;
  addTodo: any;
  DeleteTodo: any;
  handleCheckBox: any;
  isTodoLoading: boolean;
  updateTodoTitle: any;
}) => {
  const handleCompletedTodosData = () => {
    handleCompletedTodos();
  };

  return (
    <>
      <div>
        <AddTodo isLoading={isLoading} addTodo={addTodo} />
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            className={"m-2 btn btn-neutral"}
            onClick={handleCompletedTodosData}
          >
            <span>Completed Todos</span>
            <span className="text text-red-600">
              {isCompletedTodos ? "x" : ""}
            </span>
          </button>
        )}
      </div>
      <div>
        <table className="table table-fixed border-solid w-full">
          <thead>
            <tr>
              <th className="w-3"></th>
              <th className="w-2/3">Title</th>
              <th className="float-right">Actions</th>
            </tr>
          </thead>
          <TodoListTbody
            todoList={todos}
            DeleteTodo={DeleteTodo}
            handleCheckBox={handleCheckBox}
            isCompletedTodos={isCompletedTodos}
            isTodoLoading={isTodoLoading}
            updateTodoTitle={updateTodoTitle}
          />
        </table>
      </div>
    </>
  );
};
export default TodoList;
