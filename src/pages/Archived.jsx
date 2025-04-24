import useTranslation from '../hooks/useTranslation';
import { useArchivedNotes } from '../hooks/useNotes';
import { FiInfo, FiSearch, FiRefreshCw } from 'react-icons/fi';
import NoteList from '../components/NoteList';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/notesPage/SearchBar';

function Archived() {
  const { notes, isLoading, error, searchQuery, setSearchQuery, refreshNotes } = useArchivedNotes();
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-foreground text-2xl font-bold">{t('archivedNotes')}</h1>
          <button
            onClick={refreshNotes}
            className="hover:bg-muted rounded-md p-2 transition-colors"
            aria-label={t('refreshArchivedNotes')}
            title={t('refreshArchivedNotes')}
          >
            <FiRefreshCw className="text-muted-foreground h-4 w-4" />
          </button>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <Loading message={t('loadingArchivedNotes')} className="py-12" />
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <EmptyState
          icon={<FiInfo className="text-muted-foreground h-12 w-12" />}
          title={searchQuery ? t('noSearchResults') : t('emptyArchivedNotes')}
          description={
            searchQuery ? t('noNotesMatchingSearch') : t('archivedNotesEmptyDescription')
          }
        />
      )}
    </div>
  );
}

export default Archived;
