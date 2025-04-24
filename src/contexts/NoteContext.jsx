import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  getActiveNotes,
  getArchivedNotes,
  getNote,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/network-data';
import { useAuth } from '../hooks/useAuth';
import useTranslation from '../hooks/useTranslation';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const { authUser } = useAuth();
  const { t } = useTranslation();

  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isLoadingArchivedNotes, setIsLoadingArchivedNotes] = useState(false);
  const [isLoadingActiveNote, setIsLoadingActiveNote] = useState(false);
  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchNotes();
      fetchArchivedNotes();
    }
  }, [authUser]);

  const fetchNotes = useCallback(async () => {
    if (!authUser) return;

    setIsLoadingNotes(true);
    setError(null);

    try {
      const { data, error } = await getActiveNotes();

      if (!error) {
        setNotes(data);
      } else {
        setError(error);
      }
    } catch (err) {
      setError(t('errorLoadingNotes'));
    } finally {
      setIsLoadingNotes(false);
    }
  }, [authUser, t]);

  const fetchArchivedNotes = useCallback(async () => {
    if (!authUser) return;

    setIsLoadingArchivedNotes(true);
    setError(null);

    try {
      const { data, error } = await getArchivedNotes();

      if (!error) {
        setArchivedNotes(data);
      } else {
        setError(error);
      }
    } catch (err) {
      setError(t('errorLoadingArchivedNotes'));
    } finally {
      setIsLoadingArchivedNotes(false);
    }
  }, [authUser, t]);

  const fetchNoteById = useCallback(
    async id => {
      setIsLoadingActiveNote(true);
      setError(null);

      try {
        const { data, error } = await getNote(id);

        if (!error) {
          setActiveNote(data);
        } else {
          setError(error);
        }

        return { data, error };
      } catch (err) {
        const errorMessage = t('errorLoadingNote');
        setError(errorMessage);
        return { error: errorMessage };
      } finally {
        setIsLoadingActiveNote(false);
      }
    },
    [t]
  );

  const createNote = useCallback(
    async noteData => {
      setIsActionProcessing(true);
      setError(null);

      try {
        const { data, error } = await addNote(noteData);

        if (!error) {
          setNotes(prevNotes => [data, ...prevNotes]);
        }

        return { data, error };
      } catch (err) {
        const errorMessage = t('errorAddingNote');
        setError(errorMessage);
        return { error: errorMessage };
      } finally {
        setIsActionProcessing(false);
      }
    },
    [t]
  );

  const removeNote = useCallback(
    async id => {
      setIsActionProcessing(true);
      setError(null);

      try {
        const { error } = await deleteNote(id);

        if (!error) {
          setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
          setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== id));

          if (activeNote && activeNote.id === id) {
            setActiveNote(null);
          }
        }

        return { error };
      } catch (err) {
        const errorMessage = t('errorDeletingNote');
        setError(errorMessage);
        return { error: errorMessage };
      } finally {
        setIsActionProcessing(false);
      }
    },
    [activeNote, t]
  );

  const toggleArchiveStatus = useCallback(
    async (id, shouldArchive) => {
      setIsActionProcessing(true);
      setError(null);

      try {
        const { error } = shouldArchive ? await archiveNote(id) : await unarchiveNote(id);

        if (!error) {
          if (shouldArchive) {
            const noteToArchive = notes.find(note => note.id === id);
            if (noteToArchive) {
              setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
              setArchivedNotes(prevNotes => [{ ...noteToArchive, archived: true }, ...prevNotes]);
            }
          } else {
            const noteToUnarchive = archivedNotes.find(note => note.id === id);
            if (noteToUnarchive) {
              setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
              setNotes(prevNotes => [{ ...noteToUnarchive, archived: false }, ...prevNotes]);
            }
          }

          if (activeNote && activeNote.id === id) {
            setActiveNote({
              ...activeNote,
              archived: shouldArchive,
            });
          }
        }

        return { error };
      } catch (err) {
        const errorMessage = shouldArchive ? t('errorArchivingNote') : t('errorUnarchivingNote');
        setError(errorMessage);
        return { error: errorMessage };
      } finally {
        setIsActionProcessing(false);
      }
    },
    [notes, archivedNotes, activeNote, t]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const filteredNotes = searchQuery.trim()
    ? notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  const filteredArchivedNotes = searchQuery.trim()
    ? archivedNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : archivedNotes;

  useEffect(() => {
    if (!authUser) {
      setNotes([]);
      setArchivedNotes([]);
      setActiveNote(null);
      setSearchQuery('');
    }
  }, [authUser]);

  const contextValue = {
    notes: filteredNotes,
    archivedNotes: filteredArchivedNotes,
    activeNote,

    searchQuery,
    setSearchQuery,
    isLoadingNotes,
    isLoadingArchivedNotes,
    isLoadingActiveNote,
    isActionProcessing,
    error,

    fetchNotes,
    fetchArchivedNotes,
    fetchNoteById,
    createNote,
    removeNote,
    toggleArchiveStatus,
    resetError,
  };

  return <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>;
}

NoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoteContext;
