import PropTypes from 'prop-types';
import { FiRefreshCw } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';
import SearchBar from './SearchBar';
import AddNoteButton from './AddNoteButton';

function NotesHeader({ searchQuery, setSearchQuery, onRefresh }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-2xl font-bold">{t('allNotes')}</h1>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="hover:bg-muted rounded-md p-2 transition-colors"
            aria-label={t('refreshNotes')}
            title={t('refreshNotes')}
          >
            <FiRefreshCw className="text-muted-foreground h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddNoteButton />
      </div>
    </div>
  );
}

NotesHeader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
};

export default NotesHeader;
