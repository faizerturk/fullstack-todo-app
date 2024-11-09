// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Todo, { ITodo } from '@/models/Todo';

export async function GET() {
  await dbConnect();

  try {
    const todos: ITodo[] = await Todo.find({});
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const todo = new Todo(body);
    await todo.save();
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
