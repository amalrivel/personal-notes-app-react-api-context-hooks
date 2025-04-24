import { useState, useRef, useEffect } from 'react';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';
import useLocale from '../../hooks/useLocale';
import useTranslation from '../../hooks/useTranslation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ja', name: '日本語' },
];

function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguageName = languages.find(lang => lang.code === locale)?.name || 'English';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="bg-muted hover:bg-muted/80 flex h-9 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors"
        aria-label={t('language')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguageName}</span>
        <FiChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="bg-background border-input absolute right-0 z-50 mt-1 w-40 rounded-md border py-1 shadow-lg">
          <div className="py-1 text-sm">
            <p className="text-muted-foreground px-3 py-1 text-xs font-medium">
              {t('selectLanguage')}
            </p>
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => {
                  setLocale(language.code);
                  setIsOpen(false);
                }}
                className="hover:bg-muted flex w-full items-center justify-between px-3 py-2 text-left transition-colors"
              >
                <span>{language.name}</span>
                {locale === language.code && <FiCheck className="text-primary h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageToggle;
