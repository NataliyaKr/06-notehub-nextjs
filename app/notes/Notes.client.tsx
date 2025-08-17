'use client';

import { useState } from 'react';
import css from './NotesPage.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import { useDebouncedCallback } from 'use-debounce';
import type { Note } from '@/types/note';

interface NotesClientProps {
  initialData: Note[];
  initialTotalPages: number;
}

function NotesClient({ initialData, initialTotalPages }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && searchQuery === ''
        ? { notes: initialData, totalPages: initialTotalPages }
        : undefined,
  });
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <NoteList notes={data?.notes ?? []} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
