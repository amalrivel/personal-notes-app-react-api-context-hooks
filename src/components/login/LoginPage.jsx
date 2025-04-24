import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useLogin } from '../../hooks/useAuth';
import useTranslation from '../../hooks/useTranslation';
import LoginForm from './LoginForm';
import AlertMessage from '../AlertMessage';

function LoginPage() {
  const navigate = useNavigate();
  const {
    email,
    password,
    isLoading: isLoginLoading,
    onEmailChange,
    onPasswordChange,
    login,
  } = useLogin();
  const location = useLocation();
  const [loginError, setLoginError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { t } = useTranslation();

  const { from = '/', message } = location.state || {};

  useEffect(() => {
    if (message) {
      setSuccessMessage(message);
    }
  }, [message]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoginError(null);

    const { error } = await login(e);

    if (error) {
      setLoginError(t('loginError'));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-md px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">{t('appTitle')}</h1>
          <p className="text-muted-foreground text-center">{t('loginTitle')}</p>
        </div>

        {loginError && (
          <div className="bg-destructive/10 border-destructive text-destructive mb-6 rounded-md border px-4 py-3">
            {loginError}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 w-full">
            <AlertMessage
              message={successMessage}
              type="success"
              onClose={() => setSuccessMessage('')}
            />
          </div>
        )}

        <LoginForm
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          isLoginLoading={isLoginLoading}
          onSubmit={handleSubmit}
        />

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('createAccount')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
