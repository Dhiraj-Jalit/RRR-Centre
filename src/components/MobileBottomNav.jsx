import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  Trash2, 
  HeartHandshake, 
  MapPin, 
  ShoppingBag, 
  Leaf, 
  PhoneCall 
} from 'lucide-react';

export default function MobileBottomNav() {
  const { t } = useLanguage();

  const links = [
    { to: '/', label: t('common.navHome'), icon: Home },
    { to: '/segregate', label: t('common.navSegregate'), icon: Trash2 },
    { to: '/donate-sell', label: t('common.navDonate'), icon: HeartHandshake },
    { to: '/points', label: t('common.navPoints'), icon: MapPin },
    { to: '/marketplace', label: t('common.navMarket'), icon: ShoppingBag },
    { to: '/impact', label: t('common.navImpact'), icon: Leaf },
    { to: '/contact', label: t('common.navContact'), icon: PhoneCall },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-rrr-green-700/20 shadow-2xl lg:hidden safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around px-1 py-1 overflow-x-auto scrollbar-none">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[50px] min-h-[52px] py-1 px-1.5 rounded-lg text-center transition-colors focus-ring ${
                  isActive
                    ? 'text-rrr-green-800 font-bold bg-rrr-green-100/70 border-b-2 border-rrr-green-700'
                    : 'text-rrr-earth-700 hover:text-rrr-green-800 hover:bg-rrr-green-50'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-[10px] leading-tight font-medium mt-0.5 truncate max-w-[56px]">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
