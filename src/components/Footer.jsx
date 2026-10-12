import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Recycle, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-rrr-earth-900 text-white mt-12 border-t-4 border-rrr-green-600">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Partnership */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-rrr-green-600 text-white flex items-center justify-center">
                <Recycle className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                {t('common.siteTitle')}
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('common.footerPartnership')}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rrr-green-950/80 border border-rrr-green-600/40 text-xs text-rrr-green-300">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('common.verifiedCivic')}</span>
            </div>
          </div>

          {/* Collection Points Highlight */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rrr-green-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{t('common.navPoints')}</span>
            </h3>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white">{t('points.point1Title')}</p>
                <p className="text-gray-400 mt-0.5">{t('points.point1Landmark')}</p>
              </div>
              <div className="flex items-center gap-1.5 text-rrr-green-300 font-medium pt-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{t('points.timingDetails')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rrr-green-400">
              {t('common.quickNav')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/segregate" className="hover:text-rrr-green-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navSegregate')}
                </Link>
              </li>
              <li>
                <Link to="/donate-sell" className="hover:text-rrr-green-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navDonate')}
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-rrr-green-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navMarket')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-rrr-green-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navImpact')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rrr-green-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navContact')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded py-0.5 inline-block">
                  {t('common.navAdmin')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>{t('common.footerRights')}</p>
          <div className="flex items-center gap-1 text-rrr-green-400">
            <span>{t('common.townTagline')}</span>
            <Heart className="w-3.5 h-3.5 fill-current text-rrr-green-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
