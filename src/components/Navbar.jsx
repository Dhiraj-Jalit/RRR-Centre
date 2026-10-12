import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Recycle, MapPin, HeartHandshake } from 'lucide-react';

export default function Navbar() {
  const { t } = useLanguage();

  const navItems = [
    { to: '/', label: t('common.navHome') },
    { to: '/segregate', label: t('common.navSegregate') },
    { to: '/donate-sell', label: t('common.navDonate') },
    { to: '/points', label: t('common.navPoints') },
    { to: '/marketplace', label: t('common.navMarket') },
    { to: '/impact', label: t('common.navImpact') },
    { to: '/contact', label: t('common.navContact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b-2 border-rrr-green-700/20 shadow-sm">
      {/* Top Civic Banner */}
      <div className="bg-rrr-green-800 text-white text-xs py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-rrr-green-200" aria-hidden="true" />
            <span>{t('common.partnerBadge')}</span>
          </div>
          <div className="flex items-center space-x-1 text-rrr-green-100 hidden sm:flex">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('common.cityState')}</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <Link 
          to="/" 
          className="flex items-center space-x-2.5 focus-ring rounded-lg p-1 group"
          aria-label={`${t('common.siteTitle')} - ${t('common.partnerBadge')}`}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rrr-green-700 text-white flex items-center justify-center shadow-md group-hover:bg-rrr-green-800 transition-colors">
            <Recycle className="w-6 h-6 animate-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg sm:text-xl text-rrr-green-900 tracking-tight leading-none">
                {t('common.siteTitle')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-rrr-blue-100 text-rrr-blue-800 uppercase tracking-wider">
                Butibori
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-rrr-earth-700 font-medium leading-tight">
              {t('common.siteTagline')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus-ring min-h-[44px] flex items-center ${
                  isActive
                    ? 'bg-rrr-green-100 text-rrr-green-900 border-b-2 border-rrr-green-700'
                    : 'text-rrr-earth-800 hover:bg-rrr-earth-100 hover:text-rrr-green-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Language Switcher in Header */}
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
