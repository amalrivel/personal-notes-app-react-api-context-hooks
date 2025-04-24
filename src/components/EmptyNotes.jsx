import { FiInfo } from 'react-icons/fi';
import PropTypes from 'prop-types';
import useTranslation from '../hooks/useTranslation';
import EmptyState from './EmptyState';
import AddNoteButton from './notesPage/AddNoteButton';

function EmptyNotes({ searchQuery }) {
  const { t } = useTranslation();

  return (
    <EmptyState
      icon={<FiInfo className="text-muted-foreground h-12 w-12" />}
      title={searchQuery ? t('noSearchResults') : t('emptyNotes')}
      description={searchQuery ? t('noNotesMatchingSearch') : t('createYourFirstNote')}
      action={<AddNoteButton className="mt-4" />}
    />
  );
}

EmptyNotes.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default EmptyNotes;
