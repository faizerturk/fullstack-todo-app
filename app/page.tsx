// app/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface ITodo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data: ITodo[]) => setTodos(data));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });
    const todo: ITodo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    if (!todoToUpdate) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todoToUpdate.completed }),
    });
    const updatedTodo: ITodo = await res.json();
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mt-10'>TODO</h1>
      <div className='mt-6 flex'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Yeni bir görev ekleyin'
          className='border rounded-l px-4 py-2 w-64 focus:outline-none'
        />
        <button
          onClick={addTodo}
          className='bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600'
        >
          Ekle
        </button>
      </div>
      <ul className='mt-6 w-80'>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className='bg-white shadow rounded p-4 mb-2 flex justify-between items-center'
          >
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
                className='mr-2'
              />
              <span
                className={todo.completed ? 'line-through text-gray-500' : ''}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo._id)}
              className='text-red-500 hover:text-red-700'
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
