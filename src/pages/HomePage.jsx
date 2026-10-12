import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import CollectionStatusBadge from '../components/CollectionStatusBadge';
import { 
  Recycle, 
  MapPin, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Briefcase, 
  Sparkles, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 sm:space-y-14 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rrr-green-100/80 via-white to-transparent pt-6 sm:pt-10 pb-8 px-4 rounded-3xl border border-rrr-green-200/80">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Partnership Civic Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rrr-green-700 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <HeartHandshake className="w-4 h-4 text-rrr-green-200" aria-hidden="true" />
            <span>{t('common.partnerBadge')}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-rrr-green-950 tracking-tight leading-tight">
            {t('home.heroTagline')}
          </h1>

          {/* Hero Subtext */}
          <p className="text-base sm:text-lg text-rrr-earth-800 max-w-2xl mx-auto leading-relaxed">
            {t('home.heroSubtext')}
          </p>

          {/* Real-time Collection Status Callout */}
          <div className="max-w-md mx-auto pt-2">
            <CollectionStatusBadge />
          </div>

          {/* Three Large Action Buttons (Touch Targets >= 48px) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 max-w-3xl mx-auto">
            <Link
              to="/donate-sell"
              className="flex items-center justify-center gap-2.5 min-h-[54px] px-5 py-3.5 rounded-2xl bg-rrr-green-700 hover:bg-rrr-green-800 text-white font-bold text-base shadow-lg shadow-rrr-green-900/20 active:scale-[0.99] transition-all focus-ring text-center"
            >
              <Recycle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t('home.btnDonateSell')}</span>
            </Link>

            <Link
              to="/points"
              className="flex items-center justify-center gap-2.5 min-h-[54px] px-5 py-3.5 rounded-2xl bg-rrr-blue-700 hover:bg-rrr-blue-800 text-white font-bold text-base shadow-lg shadow-rrr-blue-900/20 active:scale-[0.99] transition-all focus-ring text-center"
            >
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t('home.btnFindPoints')}</span>
            </Link>

            <Link
              to="/impact"
              className="flex items-center justify-center gap-2.5 min-h-[54px] px-5 py-3.5 rounded-2xl bg-white hover:bg-rrr-earth-100 text-rrr-earth-900 border-2 border-rrr-green-700/40 font-bold text-base shadow-md active:scale-[0.99] transition-all focus-ring text-center"
            >
              <BookOpen className="w-5 h-5 shrink-0 text-rrr-green-700" aria-hidden="true" />
              <span>{t('home.btnLearnImpact')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Critical Wet Waste Clarification Callout */}
      <section className="bg-amber-50 border-l-4 border-amber-600 p-4 sm:p-5 rounded-2xl shadow-sm text-amber-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-amber-900">
              {t('home.wetDryNoticeTitle')}
            </h2>
            <p className="text-sm leading-relaxed text-amber-900/90">
              {t('home.wetDryNoticeDesc')}
            </p>
            <div className="pt-1">
              <Link
                to="/segregate"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline focus-ring rounded"
              >
                <span>{t('common.navSegregate')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-rrr-earth-900">
            {t('home.benefitsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            {t('home.benefitsSubtext')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Benefit 1 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-rrr-green-200/80 shadow-sm space-y-3 flex flex-col justify-between hover:border-rrr-green-400 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rrr-green-100 text-rrr-green-800 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-rrr-earth-900">
                {t('home.benefit1Title')}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('home.benefit1Desc')}
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rrr-green-800 hover:text-rrr-green-950 focus-ring rounded p-1"
              >
                <span>{t('common.navMarket')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-rrr-blue-200/80 shadow-sm space-y-3 flex flex-col justify-between hover:border-rrr-blue-400 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rrr-blue-100 text-rrr-blue-800 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-rrr-earth-900">
                {t('home.benefit2Title')}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('home.benefit2Desc')}
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rrr-blue-800 hover:text-rrr-blue-950 focus-ring rounded p-1"
              >
                <span>{t('impact.jobsTitle')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-emerald-200/80 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-400 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-rrr-earth-900">
                {t('home.benefit3Title')}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('home.benefit3Desc')}
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/impact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 focus-ring rounded p-1"
              >
                <span>{t('home.btnLearnImpact')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Center Quick Strip */}
      <section className="bg-white p-6 rounded-3xl border-2 border-rrr-green-700/20 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-rrr-earth-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rrr-green-700" />
              <span>{t('points.pageTitle')}</span>
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {t('points.timingDetails')}
            </p>
          </div>
          <Link
            to="/points"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rrr-green-700 hover:bg-rrr-green-800 text-white rounded-xl text-sm font-bold focus-ring shadow-sm self-start sm:self-auto"
          >
            <span>{t('home.btnFindPoints')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-rrr-green-50/60 border border-rrr-green-200 text-sm">
          <span className="text-xs font-bold text-rrr-green-800 uppercase tracking-wide">
            {t('points.point1Partner')}
          </span>
          <p className="font-bold text-base text-rrr-earth-900 mt-1">{t('points.point1Title')}</p>
          <p className="text-xs text-gray-600 mt-0.5">{t('points.point1Landmark')}</p>
        </div>
      </section>
    </div>
  );
}
