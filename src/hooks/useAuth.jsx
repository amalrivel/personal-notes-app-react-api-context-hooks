import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { login as loginApi, register as registerApi } from '../utils/network-data';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function useLogin() {
  const { onLoginSuccess } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  const login = async e => {
    e.preventDefault();
    setIsLoading(true);

    const { error, data } = await loginApi({ email, password });

    if (!error) {
      onLoginSuccess(data.accessToken);
    }

    setIsLoading(false);
    return { error, data };
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return {
    email,
    password,
    isLoading,
    onEmailChange,
    onPasswordChange,
    login,
    resetForm,
  };
}

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onNameChange = e => setName(e.target.value);
  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);
  const onConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const register = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return { error: true };
    }

    setIsLoading(true);

    const { error } = await registerApi({ name, email, password });
    setIsLoading(false);

    return { error };
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return {
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
  };
}
