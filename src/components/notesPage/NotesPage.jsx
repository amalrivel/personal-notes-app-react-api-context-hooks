import useTranslation from '../../hooks/useTranslation';
import { useActiveNotes } from '../../hooks/useNotes';
import NotesHeader from './NotesHeader';
import NoteList from '../NoteList';
import EmptyNotes from '../EmptyNotes';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';

function NotesPage() {
  const { notes, isLoading, error, searchQuery, setSearchQuery, refreshNotes } = useActiveNotes();

  const { t } = useTranslation();

  return (
    <div className="w-full space-y-6">
      <NotesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRefresh={refreshNotes}
      />

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <Loading message={t('loadingNotes')} className="py-12" />
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <EmptyNotes searchQuery={searchQuery} />
      )}
    </div>
  );
}

export default NotesPage;
