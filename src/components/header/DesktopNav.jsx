import { Link } from 'react-router';
import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function DesktopNav({ authUser }) {
  const { t } = useTranslation();

  if (!authUser) return null;

  return (
    <nav className="hidden items-center gap-6 md:flex">
      <Link to="/" className="text-foreground hover:text-primary transition-colors">
        {t('allNotes')}
      </Link>
      <Link to="/archived" className="text-foreground hover:text-primary transition-colors">
        {t('archive')}
      </Link>
    </nav>
  );
}

DesktopNav.propTypes = {
  authUser: PropTypes.object,
};

export default DesktopNav;
