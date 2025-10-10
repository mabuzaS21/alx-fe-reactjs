import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('renders Todo List header', () => {
    render(<TodoList />);
    const header = screen.getByText(/Todo List/i);
    expect(header).toBeInTheDocument();
  });
  
  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
   const addButton = screen.getByText(/Add Todo/i);
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const newTodo = screen.getByText(/Test Todo/i);
    expect(newTodo).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const todo = screen.getByText(/Learn React/i);
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todoToDelete = screen.getByText(/Learn React/i);
    const deleteButton = todoToDelete.nextElementSibling; 

    expect(todoToDelete).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(todoToDelete).not.toBeInTheDocument();
    
    const remainingTodos = screen.queryAllByRole('listitem');
    expect(remainingTodos).toHaveLength(1);
  });

  test('does not add an empty todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);

    const newTodo = screen.queryByText(/Test Todo/i);
    expect(newTodo).not.toBeInTheDocument();
  });
});
