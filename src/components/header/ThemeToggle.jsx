import { FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-muted hover:bg-muted/80 flex h-9 w-9 items-center justify-center rounded-md transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
}

export default ThemeToggle;
