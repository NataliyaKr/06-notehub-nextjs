'use client';

interface ErrorId {
  error: Error;
}

export default function NoteIdError({ error }: ErrorId) {
  return <p>Could not fetch note details. {error.message}</p>;
}
