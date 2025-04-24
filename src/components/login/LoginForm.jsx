import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';
import PropTypes from 'prop-types';

function LoginForm({ email, password, onEmailChange, onPasswordChange, isLoginLoading, onSubmit }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-foreground mb-1 block text-sm font-medium">
          {t('email')}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiMail className="text-muted-foreground" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder={t('emailPlaceholder')}
            className="bg-background border-input text-foreground focus:ring-primary/50 w-full rounded-md border px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-foreground mb-1 block text-sm font-medium">
          {t('password')}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiLock className="text-muted-foreground" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder={t('passwordPlaceholder')}
            className="bg-background border-input text-foreground focus:ring-primary/50 w-full rounded-md border px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoginLoading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 transition-colors"
      >
        {isLoginLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>{t('loading')}</span>
          </>
        ) : (
          <>
            <FiLogIn />
            <span>{t('login')}</span>
          </>
        )}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  isLoginLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
