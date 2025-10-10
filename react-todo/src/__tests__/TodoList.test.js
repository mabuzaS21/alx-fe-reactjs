import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a todo');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('does not add an empty todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a todo');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');

    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    const deleteButton = screen.getByTestId('delete-todo-1');

    fireEvent.click(deleteButton);
    expect(todoItem).not.toBeInTheDocument();
  });

  test('deletes multiple todos', () => {
    render(<TodoList />);
    const todo1 = screen.getByText('Learn React');
    const todo2 = screen.getByText('Build Todo App');
    const deleteButton1 = screen.getByTestId('delete-todo-1');
    const deleteButton2 = screen.getByTestId('delete-todo-2');

    fireEvent.click(deleteButton1);
    expect(todo1).not.toBeInTheDocument();
    expect(todo2).toBeInTheDocument();

    fireEvent.click(deleteButton2);
    expect(todo2).not.toBeInTheDocument();
  });
});
