import React, { FormEvent, useState } from "react";

function AddTodo() {
  const [title, setTitle] = useState("");
  const handleSubmit = (e: FormEvent) => {
    // Add to Database
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </form>
    </>
  );
}

export default AddTodo;
