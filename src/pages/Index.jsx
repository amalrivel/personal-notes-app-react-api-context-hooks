import { useAuth } from '../hooks/useAuth';
import useTranslation from '../hooks/useTranslation';
import Loading from '../components/Loading';
import LoginPage from '../components/login';
import NotesPage from '../components/notesPage/NotesPage';

function Index() {
  const { authUser, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return <Loading className="flex-1" message={t('checkingAuth')} />;
  }

  if (!authUser) {
    return <LoginPage />;
  }

  return <NotesPage />;
}

export default Index;
