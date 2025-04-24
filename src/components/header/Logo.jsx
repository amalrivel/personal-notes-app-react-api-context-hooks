import { Link } from 'react-router';
import { FiBook } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';

function Logo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className="flex items-center gap-2">
      <FiBook className="text-primary h-6 w-6" />
      <h1 className="text-foreground text-xl font-bold">{t('appTitle')}</h1>
    </Link>
  );
}

export default Logo;
