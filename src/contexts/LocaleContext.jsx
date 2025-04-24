import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || 'en';
  });

  const setLocale = useCallback(localeCode => {
    setLocaleState(localeCode);
    localStorage.setItem('locale', localeCode);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
