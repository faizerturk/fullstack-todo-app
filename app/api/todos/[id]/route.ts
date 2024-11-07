import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Todo from '@/models/Todo';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;

  try {
    const body = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
