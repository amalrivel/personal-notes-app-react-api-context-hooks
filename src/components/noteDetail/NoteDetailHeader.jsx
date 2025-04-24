import { Link } from 'react-router';
import { FiArrowLeft, FiInbox } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function NoteDetailHeader({ note }) {
  const { t } = useTranslation();

  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <Link
        to="/"
        className="text-foreground hover:text-primary inline-flex items-center gap-2 transition-colors"
      >
        <FiArrowLeft className="h-4 w-4" />
        <span>{t('backToAllNotes')}</span>
      </Link>

      <div className="flex items-center gap-2">
        {note && note.archived && (
          <div className="bg-muted text-muted-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm">
            <FiInbox className="h-3.5 w-3.5" />
            <span>{t('archived')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

NoteDetailHeader.propTypes = {
  note: PropTypes.shape({
    archived: PropTypes.bool,
  }),
};

export default NoteDetailHeader;
