import { Link } from 'react-router';
import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <FiAlertTriangle className="text-destructive mx-auto h-20 w-20" />
      </div>

      <h1 className="text-foreground mb-2 text-4xl font-bold">404</h1>

      <h2 className="text-foreground mb-4 text-2xl font-semibold">{t('pageNotFound')}</h2>

      <p className="text-muted-foreground mb-8 max-w-md">{t('pageNotFoundDescription')}</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-6 py-3 transition-colors"
        >
          <FiHome className="h-4 w-4" />
          <span>{t('backToHome')}</span>
        </Link>

        <button
          onClick={() => window.history.back()}
          className="border-input bg-background text-foreground hover:bg-muted flex items-center justify-center gap-2 rounded-md border px-6 py-3 transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>{t('goBack')}</span>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
