import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { wasteCategories, hazardousWasteItems } from '../data/wasteCategories';
import { 
  FileText, 
  Package, 
  Wrench, 
  Wine, 
  Shirt, 
  Smartphone, 
  Home, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Sprout, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

const iconMap = {
  FileText,
  Package,
  Wrench,
  Wine,
  Shirt,
  Smartphone,
  Home
};

export default function SegregationPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-8">
      {/* Header */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rrr-green-100 text-rrr-green-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-rrr-green-700" />
          <span>{t('segregate.goldenRuleTitle')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('segregate.pageTitle')}
        </h1>
        <p className="text-base text-gray-700 leading-relaxed">
          {t('segregate.pageSubtitle')}
        </p>
      </section>

      {/* Two-Bin Golden Rule Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wet Waste Card */}
        <div className="bg-emerald-50/70 border-3 border-emerald-500 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-black text-emerald-950">
                  {t('segregate.wetWasteTitle')}
                </h2>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full">
                  {t('segregate.wetWasteBadge')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-emerald-950 leading-relaxed">
            {t('segregate.wetWasteDesc')}
          </p>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t('segregate.wetWasteExamplesTitle')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {t('segregate.wetWasteExamples')}
            </p>
          </div>
        </div>

        {/* Dry Waste Card */}
        <div className="bg-sky-50/70 border-3 border-sky-500 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rrr-blue-700 text-white flex items-center justify-center shadow-md">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-black text-sky-950">
                  {t('segregate.dryWasteTitle')}
                </h2>
                <span className="text-xs font-bold text-sky-800 bg-sky-200/80 px-2 py-0.5 rounded-full">
                  {t('segregate.dryWasteBadge')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-sky-950 leading-relaxed">
            {t('segregate.dryWasteDesc')}
          </p>

          <div className="bg-white/80 p-4 rounded-2xl border border-sky-200 space-y-1.5">
            <p className="text-xs sm:text-sm text-sky-950 font-medium leading-relaxed">
              {t('segregate.goldenRuleDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Hazardous Waste Warning Section (CRITICAL - Never in normal bin) */}
      <section className="bg-red-50 border-3 border-red-500 rounded-3xl p-6 sm:p-7 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-red-950">
                {t('segregate.hazardousTitle')}
              </h2>
              <span className="text-xs font-black uppercase bg-red-700 text-white px-2.5 py-0.5 rounded-full">
                {t('segregate.badgeHazardous')}
              </span>
            </div>
            <p className="text-sm font-bold text-red-900 mt-1">
              {t('segregate.hazardousAlert')}
            </p>
          </div>
        </div>

        <div className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-red-300">
          <p className="text-xs font-bold uppercase tracking-wider text-red-800 mb-3 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>{t('segregate.hazardousListTitle')}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs sm:text-sm font-semibold text-red-950">
            {hazardousWasteItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 bg-red-100/60 rounded-xl border border-red-200">
                <XCircle className="w-4 h-4 text-red-700 shrink-0" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-red-800 mt-3 italic font-medium">
            * {t('segregate.hazardousItems')}
          </p>
        </div>
      </section>

      {/* Dry Waste Detailed Category Visual Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-black text-rrr-earth-900">
            {t('segregate.cardsTitle')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('segregate.categoryCardsSummary')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wasteCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Package;
            const isReusable = cat.badgeType === 'reusable';

            return (
              <div 
                key={cat.id} 
                className="bg-white rounded-2xl border-2 border-gray-200 p-5 shadow-sm space-y-3.5 flex flex-col justify-between hover:border-rrr-green-500 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-rrr-green-100 text-rrr-green-800 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isReusable 
                        ? 'bg-purple-100 text-purple-900 border border-purple-300' 
                        : 'bg-rrr-blue-100 text-rrr-blue-900 border border-rrr-blue-300'
                    }`}>
                      {t(cat.badgeKey)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-rrr-earth-900">
                    {t(cat.titleKey)}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t(cat.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
