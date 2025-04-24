import { FiMenu, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-muted hover:bg-muted/80 flex h-9 w-9 items-center justify-center rounded-md transition-colors md:hidden"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
    </button>
  );
}

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileMenuButton;
