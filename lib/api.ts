import axios from 'axios';
import type { NewNote, Note } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_Key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${API_Key}` },
});

export const fetchNotes = async (page: number, search: string) => {
  const params: Record<string, string | number> = { page };
  if (search.trim()) {
    params.search = search.trim();
  }
  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: NewNote) => {
  const res = await api.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
