import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages, t } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm border-2 border-rrr-green-700/30 rounded-xl p-1 shadow-sm">
      <div className="flex items-center pl-1.5 pr-1 text-rrr-green-800" aria-hidden="true">
        <Languages className="w-4 h-4" />
      </div>
      <div 
        role="group" 
        aria-label={t('common.selectLanguage')} 
        className="flex items-center space-x-1"
      >
        {availableLanguages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isActive}
              className={`min-h-[38px] px-2.5 py-1 text-sm font-semibold rounded-lg transition-colors focus-ring ${
                isActive
                  ? 'bg-rrr-green-700 text-white shadow-sm'
                  : 'text-rrr-earth-800 hover:bg-rrr-green-100 hover:text-rrr-green-900'
              }`}
              title={lang.label}
            >
              <span>{lang.native}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
