import { Metadata } from 'next';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

export const metadata: Metadata = {
  title: 'Notes',
};

export default async function Notes() {
  const { notes, totalPages } = await fetchNotes(1, '');
  return (
    <NotesClient initialData={notes as Note[]} initialTotalPages={totalPages} />
  );
}
