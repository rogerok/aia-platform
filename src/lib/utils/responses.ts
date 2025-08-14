import { NextResponse } from 'next/server';

export const createErrorResponse = (text: string, code: number) =>
  NextResponse.json(
    {
      error: text,
    },
    { status: code },
  );
export const create404Response = (text: string) =>
  createErrorResponse(text, 404);

export const create400Response = (text: string) =>
  createErrorResponse(text, 400);
