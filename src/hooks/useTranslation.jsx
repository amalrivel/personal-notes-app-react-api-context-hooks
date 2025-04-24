import useLocale from './useLocale';
import localeData from '../utils/localeData';

export default function useTranslation() {
  const { locale } = useLocale();

  const t = key => {
    if (localeData[locale] && localeData[locale][key]) {
      return localeData[locale][key];
    }

    if (localeData.en && localeData.en[key]) {
      return localeData.en[key];
    }

    return key;
  };

  return { t };
}
