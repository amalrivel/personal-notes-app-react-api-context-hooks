import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

import Logo from './Logo';
import DesktopNav from './DesktopNav';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

function Header() {
  const { authUser, onLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <header className="bg-card border-border sticky top-0 z-10 border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        <DesktopNav authUser={authUser} />

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <UserMenu user={authUser} />

          {authUser && <MobileMenuButton isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />}
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        user={authUser}
        onCloseMobileMenu={closeMobileMenu}
        onLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
