import { Link } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import useTranslation from '../../hooks/useTranslation';

function AddNoteButton({ className = '' }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/new"
      className={`bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-md px-4 py-2 transition-colors hover:opacity-90 ${className}`}
    >
      <FiPlus className="h-4 w-4" />
      <span>{t('addNote')}</span>
    </Link>
  );
}

AddNoteButton.propTypes = {
  className: PropTypes.string,
};

export default AddNoteButton;
