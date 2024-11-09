// app/api/todos/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Todo from '@/models/Todo';

export async function PUT(request: Request) {
  await dbConnect();

  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID missing' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();

  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID missing' }, { status: 400 });
  }

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
