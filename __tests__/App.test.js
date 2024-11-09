import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

describe('Todo App', () => {
  it('should add a new todo item', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText('Yeni bir görev ekleyin');
    const addButton = screen.getByText('Ekle');

    fireEvent.change(input, { target: { value: 'buy some milk' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText('buy some milk');
    expect(todoItem).toBeInTheDocument();
  });
});
