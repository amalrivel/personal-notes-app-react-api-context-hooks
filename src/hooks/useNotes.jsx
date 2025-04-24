import { useContext } from 'react';
import NoteContext from '../contexts/NoteContext';

export function useNotes() {
  const context = useContext(NoteContext);

  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }

  return context;
}

export function useActiveNotes() {
  const { notes, isLoadingNotes, searchQuery, setSearchQuery, error, fetchNotes } = useNotes();

  return {
    notes,
    isLoading: isLoadingNotes,
    searchQuery,
    setSearchQuery,
    error,
    refreshNotes: fetchNotes,
  };
}

export function useArchivedNotes() {
  const {
    archivedNotes,
    isLoadingArchivedNotes,
    searchQuery,
    setSearchQuery,
    error,
    fetchArchivedNotes,
  } = useNotes();

  return {
    notes: archivedNotes,
    isLoading: isLoadingArchivedNotes,
    searchQuery,
    setSearchQuery,
    error,
    refreshNotes: fetchArchivedNotes,
  };
}

export function useNoteActions() {
  const { createNote, removeNote, toggleArchiveStatus, isActionProcessing } = useNotes();

  return {
    createNote,
    deleteNote: removeNote,
    archiveNote: id => toggleArchiveStatus(id, true),
    unarchiveNote: id => toggleArchiveStatus(id, false),
    isProcessing: isActionProcessing,
  };
}

export function useNoteDetail(id) {
  const {
    activeNote,
    isLoadingActiveNote,
    error,
    fetchNoteById,
    removeNote,
    toggleArchiveStatus,
    isActionProcessing,
  } = useNotes();

  const loadNote = () => fetchNoteById(id);

  return {
    note: activeNote,
    isLoading: isLoadingActiveNote,
    error,
    loadNote,
    deleteNote: () => removeNote(id),
    toggleArchive: () => toggleArchiveStatus(id, !activeNote?.archived),
    isProcessing: isActionProcessing,
  };
}
