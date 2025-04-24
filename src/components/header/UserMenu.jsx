import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function UserMenu({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="relative hidden md:block">
      <button
        onClick={toggleMenu}
        className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
        aria-label="User menu"
        aria-expanded={menuOpen}
      >
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          <span>{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <span className="font-medium">{user.name}</span>
      </button>

      {menuOpen && (
        <div className="bg-card border-border animate-fadeIn absolute right-0 mt-2 w-48 rounded-md border py-1 shadow-lg">
          <div className="border-border border-b px-4 py-2">
            <p className="text-foreground font-medium">{user.name}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-foreground hover:bg-muted flex w-full items-center gap-2 px-4 py-2 text-left transition-colors"
          >
            <FiLogOut className="h-4 w-4" />
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
};

export default UserMenu;
