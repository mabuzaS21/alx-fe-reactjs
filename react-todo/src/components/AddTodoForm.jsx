import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTodo(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
