import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';

const translations = { en, hi, mr };

export const availableLanguages = [
  { code: 'mr', label: 'मराठी', native: 'मराठी', short: 'MR' },
  { code: 'hi', label: 'हिंदी', native: 'हिंदी', short: 'HI' },
  { code: 'en', label: 'English', native: 'English', short: 'EN' }
];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('rrr_language');
      if (saved && translations[saved]) {
        return saved;
      }
    } catch {
      // Ignore localStorage issues
    }
    return 'mr'; // Default to Marathi for Butibori community
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem('rrr_language', lang);
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Helper to fetch translated text.
   * Supports dot notation, e.g. t('home.heroTagline')
   */
  const t = (path, params = {}) => {
    const keys = path.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        current = null;
        break;
      }
    }

    if (!current) {
      let fallback = translations['en'];
      for (const key of keys) {
        if (fallback && typeof fallback === 'object' && key in fallback) {
          fallback = fallback[key];
        } else {
          fallback = null;
          break;
        }
      }
      current = fallback || path;
    }

    if (typeof current === 'string' && params) {
      let result = current;
      Object.keys(params).forEach(param => {
        result = result.replace(new RegExp(`{${param}}`, 'g'), params[param]);
      });
      return result;
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
