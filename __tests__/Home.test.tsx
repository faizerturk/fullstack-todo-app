// __tests__/Home.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../app/page';
import fetchMock from 'jest-fetch-mock';

describe('Fullstack Todo App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches and displays todos on load', async () => {
    const mockTodos = [
      { _id: '1', text: 'Buy milk', completed: false },
      { _id: '2', text: 'Walk the dog', completed: true },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockTodos));

    render(<Home />);

    // Verify fetch was called
    expect(fetchMock).toHaveBeenCalledWith('/api/todos');

    // Wait for todos to appear in the document
    for (const todo of mockTodos) {
      expect(await screen.findByText(todo.text)).toBeInTheDocument();
    }
  });

  it('adds a new todo item', async () => {
    // Initial fetch response
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<Home />);

    const input = screen.getByPlaceholderText('Yeni bir görev ekleyin');
    const addButton = screen.getByText('Ekle');

    // Simulate entering a new todo using userEvent
    await userEvent.type(input, 'Buy bread');

    // Mock the POST request
    const newTodo = { _id: '3', text: 'Buy bread', completed: false };
    fetchMock.mockResponseOnce(JSON.stringify(newTodo));

    // Click the add button using userEvent
    await userEvent.click(addButton);

    // Ensure POST was called correctly
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/todos',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Buy bread' }),
      })
    );

    // Wait for the new todo to appear
    expect(await screen.findByText('Buy bread')).toBeInTheDocument();
  });

  it('toggles a todo item completion status', async () => {
    const mockTodos = [{ _id: '1', text: 'Buy milk', completed: false }];

    fetchMock.mockResponseOnce(JSON.stringify(mockTodos));

    render(<Home />);

    // Wait for the todo to load
    const todoText = await screen.findByText('Buy milk');
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    // Mock the PUT request
    const updatedTodo = { _id: '1', text: 'Buy milk', completed: true };
    fetchMock.mockResponseOnce(JSON.stringify(updatedTodo));

    // Toggle the checkbox using userEvent
    await userEvent.click(checkbox);

    // Ensure PUT was called correctly
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/todos/1',
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })
    );

    // Wait for the updated todo to have line-through
    await waitFor(() => {
      expect(todoText).toHaveClass('line-through text-gray-500');
    });
  });

  it('deletes a todo item', async () => {
    const mockTodos = [{ _id: '1', text: 'Buy milk', completed: false }];

    fetchMock.mockResponseOnce(JSON.stringify(mockTodos));

    render(<Home />);

    // Wait for the todo to load
    const todoText = await screen.findByText('Buy milk');
    const deleteButton = screen.getByText('Sil');

    // Mock the DELETE request
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    // Click the delete button using userEvent
    await userEvent.click(deleteButton);

    // Ensure DELETE was called correctly
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/todos/1',
      expect.objectContaining({
        method: 'DELETE',
      })
    );

    // Wait for the todo to be removed
    await waitFor(() => {
      expect(todoText).not.toBeInTheDocument();
    });
  });
});
