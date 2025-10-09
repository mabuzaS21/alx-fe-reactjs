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
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(screen.getByText(/Add Todo/i));

    const newTodo = screen.getByText(/Test Todo/i);
    expect(newTodo).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const todo = screen.getByText(/Learn React/i);
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText(/Delete/i)[0];
    fireEvent.click(deleteButton);

    const todo = screen.queryByText(/Learn React/i);
    expect(todo).toBeNull();
  });
});
