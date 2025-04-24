import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';
import { FiTrash2, FiArchive, FiLoader } from 'react-icons/fi';

function NoteActions({ note, onDelete, onToggleArchive, isProcessing }) {
  const { t } = useTranslation();

  return (
    <div className="border-border flex flex-wrap justify-end gap-3 border-t p-4">
      <button
        onClick={onDelete}
        disabled={isProcessing}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2 rounded-md px-4 py-2 transition-colors"
      >
        {isProcessing ? (
          <FiLoader className="h-4 w-4 animate-spin" />
        ) : (
          <FiTrash2 className="h-4 w-4" />
        )}
        <span>{t('deleteNote')}</span>
      </button>

      <button
        onClick={onToggleArchive}
        disabled={isProcessing}
        className="bg-muted text-foreground hover:bg-muted/80 border-input flex items-center gap-2 rounded-md border px-4 py-2 transition-colors"
      >
        {isProcessing ? (
          <FiLoader className="h-4 w-4 animate-spin" />
        ) : (
          <FiArchive className="h-4 w-4" />
        )}
        <span>{note.archived ? t('unarchiveNote') : t('archiveNote')}</span>
      </button>
    </div>
  );
}

NoteActions.propTypes = {
  note: PropTypes.shape({
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleArchive: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default NoteActions;
