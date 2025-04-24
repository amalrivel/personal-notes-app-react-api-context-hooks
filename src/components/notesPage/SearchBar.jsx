import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import useTranslation from '../../hooks/useTranslation';

function SearchBar({ searchQuery, setSearchQuery }) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder={t('search')}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="bg-background border-input focus:ring-primary/50 w-full rounded-md border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none sm:w-64"
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
