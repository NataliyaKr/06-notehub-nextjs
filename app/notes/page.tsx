import { Metadata } from 'next';
import NotesClient from './Notes.client';

export const metadata: Metadata = {
  title: 'Notes',
};

export default function Notes() {
  return <NotesClient />;
}
