import { Link } from 'react-router';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function MobileMenu({ isOpen, user, onCloseMobileMenu, onLogout }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="bg-card border-border animate-fadeIn container mx-auto border-b px-4 py-3 md:hidden">
      {user && (
        <div className="border-border mb-4 border-b pb-3">
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-lg">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-foreground font-medium">{user.name}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {user && (
        <nav className="flex flex-col space-y-3">
          <Link
            to="/"
            className="text-foreground hover:text-primary py-2 transition-colors"
            onClick={onCloseMobileMenu}
          >
            {t('allNotes')}
          </Link>
          <Link
            to="/archived"
            className="text-foreground hover:text-primary py-2 transition-colors"
            onClick={onCloseMobileMenu}
          >
            {t('archive')}
          </Link>

          <button
            onClick={onLogout}
            className="text-foreground hover:text-primary flex w-full items-center gap-2 py-2 text-left transition-colors"
          >
            <FiLogOut className="h-4 w-4" />
            {t('logout')}
          </button>
        </nav>
      )}
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onCloseMobileMenu: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MobileMenu;
