import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiMail } from 'react-icons/fi';
import IconInput from './IconInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import AlertError from './AlertError';
import AuthLink from './AuthLink';
import AuthFormHeader from './AuthFormHeader';

function RegisterForm({
  name,
  email,
  password,
  confirmPassword,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isLoading,
  error,
  translations,
}) {
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    setSubmitError('');

    const { error: registrationError } = await onSubmit(e);

    if (registrationError) {
      setSubmitError(
        typeof registrationError === 'string' ? registrationError : translations.registerError
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <AuthFormHeader title={translations.register} subtitle={translations.createAccount} />

      <AlertError message={submitError || error} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <IconInput
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onNameChange}
          label={translations.name}
          placeholder={translations.namePlaceholder}
          icon={FiUser}
          disabled={isLoading}
          required
          autoComplete="name"
        />

        <IconInput
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          label={translations.email}
          placeholder={translations.emailPlaceholder}
          icon={FiMail}
          disabled={isLoading}
          required
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          label={translations.password}
          placeholder={translations.passwordPlaceholder}
          disabled={isLoading}
          required
          autoComplete="new-password"
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          label={translations.confirmPassword}
          placeholder={translations.confirmPasswordPlaceholder}
          disabled={isLoading}
          required
          autoComplete="new-password"
        />

        <div>
          <SubmitButton
            isLoading={isLoading}
            loadingText={translations.registering || 'Registering...'}
            text={translations.register}
          />
        </div>

        <AuthLink text={translations.hasAccount} linkText={translations.loginHere} to="/login" />
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

export default RegisterForm;
