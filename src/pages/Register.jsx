import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation';
import { useRegister } from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/register/RegisterForm';

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const {
    name,
    email,
    password,
    confirmPassword,
    isLoading,
    error,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    register,
    resetForm,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }

    return () => resetForm();
  }, [authUser]);

  const handleRegister = async e => {
    const result = await register(e);

    if (!result.error) {
      navigate('/', { state: { message: t('registerSuccess') } });
    }

    return result;
  };

  const translations = {
    register: t('register'),
    createAccount: t('createAccount'),
    name: t('name'),
    namePlaceholder: t('namePlaceholder'),
    email: t('email'),
    emailPlaceholder: t('emailPlaceholder'),
    password: t('password'),
    passwordPlaceholder: t('passwordPlaceholder'),
    confirmPassword: t('confirmPassword'),
    confirmPasswordPlaceholder: t('confirmPasswordPlaceholder'),
    hasAccount: t('hasAccount'),
    loginHere: t('loginHere'),
    registering: t('registering'),
    registerError: t('registerError'),
    registerSuccess: t('registerSuccess'),
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <RegisterForm
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChange={onNameChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onConfirmPasswordChange={onConfirmPasswordChange}
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
        translations={translations}
      />
    </div>
  );
}

export default Register;
