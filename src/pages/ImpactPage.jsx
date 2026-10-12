import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Flame, 
  Trash2, 
  Recycle, 
  HeartHandshake, 
  Sprout, 
  Wind, 
  Droplets, 
  Globe2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Hammer,
  Truck,
  GraduationCap
} from 'lucide-react';

export default function ImpactPage() {
  const { t } = useLanguage();

  const pathways = [
    {
      id: 'dumping',
      titleKey: 'impact.dumpingTitle',
      soilKey: 'impact.dumpingSoil',
      airKey: 'impact.dumpingAir',
      waterKey: 'impact.dumpingWater',
      badgeKey: 'impact.badgeDestructive',
      badgeClass: 'bg-red-100 text-red-900 border-red-300',
      borderClass: 'border-red-400 bg-red-50/40',
      icon: Flame,
      iconColor: 'text-red-600'
    },
    {
      id: 'landfill',
      titleKey: 'impact.landfillTitle',
      soilKey: 'impact.landfillSoil',
      airKey: 'impact.landfillAir',
      waterKey: 'impact.landfillWater',
      badgeKey: 'impact.badgeHarmful',
      badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
      borderClass: 'border-orange-400 bg-orange-50/40',
      icon: Trash2,
      iconColor: 'text-orange-600'
    },
    {
      id: 'recycling',
      titleKey: 'impact.recyclingTitle',
      soilKey: 'impact.recyclingSoil',
      airKey: 'impact.recyclingAir',
      waterKey: 'impact.recyclingWater',
      badgeKey: 'impact.badgePositive',
      badgeClass: 'bg-rrr-blue-100 text-rrr-blue-900 border-rrr-blue-300',
      borderClass: 'border-rrr-blue-400 bg-rrr-blue-50/40',
      icon: Recycle,
      iconColor: 'text-rrr-blue-600'
    },
    {
      id: 'reuse',
      titleKey: 'impact.reuseTitle',
      soilKey: 'impact.reuseSoil',
      airKey: 'impact.reuseAir',
      waterKey: 'impact.reuseWater',
      badgeKey: 'impact.badgeCommunity',
      badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
      borderClass: 'border-purple-400 bg-purple-50/40',
      icon: HeartHandshake,
      iconColor: 'text-purple-600'
    },
    {
      id: 'compost',
      titleKey: 'impact.compostTitle',
      soilKey: 'impact.compostSoil',
      airKey: 'impact.compostAir',
      waterKey: 'impact.compostWater',
      badgeKey: 'impact.badgeFertility',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      borderClass: 'border-emerald-500 bg-emerald-50/50',
      icon: Sprout,
      iconColor: 'text-emerald-600'
    }
  ];

  const jobsList = [
    {
      titleKey: 'impact.job1Title',
      descKey: 'impact.job1Desc',
      icon: Recycle
    },
    {
      titleKey: 'impact.job2Title',
      descKey: 'impact.job2Desc',
      icon: Truck
    },
    {
      titleKey: 'impact.job3Title',
      descKey: 'impact.job3Desc',
      icon: Hammer
    },
    {
      titleKey: 'impact.job4Title',
      descKey: 'impact.job4Desc',
      icon: TrendingUp
    },
    {
      titleKey: 'impact.job5Title',
      descKey: 'impact.job5Desc',
      icon: GraduationCap
    },
    {
      titleKey: 'impact.job6Title',
      descKey: 'impact.job6Desc',
      icon: Briefcase
    }
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('impact.pageTitle')}
        </h1>
        <p className="text-base text-gray-700 leading-relaxed">
          {t('impact.pageSubtitle')}
        </p>
      </section>

      {/* Side-by-side Pathway Comparison ("What happens to our waste?") */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-black text-rrr-earth-900">
            {t('impact.comparisonTitle')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('impact.comparisonSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                className={`rounded-3xl border-2 ${path.borderClass} p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${path.iconColor}`} />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${path.badgeClass}`}>
                      {t(path.badgeKey)}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-rrr-earth-900 leading-snug">
                    {t(path.titleKey)}
                  </h3>

                  {/* Effects Breakdown */}
                  <div className="space-y-2 text-xs pt-2">
                    <div className="bg-white/90 p-2.5 rounded-xl border border-gray-200/80 space-y-0.5">
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        <Globe2 className="w-3.5 h-3.5 text-amber-700" />
                        {t('impact.soilEffectLabel')}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{t(path.soilKey)}</p>
                    </div>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-gray-200/80 space-y-0.5">
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-sky-700" />
                        {t('impact.airEffectLabel')}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{t(path.airKey)}</p>
                    </div>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-gray-200/80 space-y-0.5">
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-blue-700" />
                        {t('impact.waterEffectLabel')}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{t(path.waterKey)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified Statistics Placeholders (No Invented Numbers) */}
      <section className="bg-white rounded-3xl border-2 border-rrr-green-700/20 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rrr-green-100 text-rrr-green-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-rrr-green-700" />
            <span>{t('impact.statsNotice')}</span>
          </div>
          <h2 className="text-2xl font-black text-rrr-earth-900">
            {t('impact.statsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rrr-earth-100 border border-gray-300 space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              {t('impact.stat1Title')}
            </p>
            <div className="p-3 bg-white rounded-xl border border-dashed border-gray-400 font-mono text-xs sm:text-sm font-semibold text-rrr-green-900">
              {t('impact.stat1Placeholder')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rrr-earth-100 border border-gray-300 space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              {t('impact.stat2Title')}
            </p>
            <div className="p-3 bg-white rounded-xl border border-dashed border-gray-400 font-mono text-xs sm:text-sm font-semibold text-rrr-blue-900">
              {t('impact.stat2Placeholder')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rrr-earth-100 border border-gray-300 space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              {t('impact.stat3Title')}
            </p>
            <div className="p-3 bg-white rounded-xl border border-dashed border-gray-400 font-mono text-xs sm:text-sm font-semibold text-purple-900">
              {t('impact.stat3Placeholder')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rrr-earth-100 border border-gray-300 space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              {t('impact.stat4Title')}
            </p>
            <div className="p-3 bg-white rounded-xl border border-dashed border-gray-400 font-mono text-xs sm:text-sm font-semibold text-emerald-900">
              {t('impact.stat4Placeholder')}
            </div>
          </div>
        </div>
      </section>

      {/* Local Green Employment Section */}
      <section className="bg-gradient-to-br from-rrr-blue-50 via-white to-rrr-green-50 rounded-3xl border-3 border-rrr-blue-300 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rrr-blue-700 text-white text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('impact.jobsGuaranteeBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-rrr-earth-900">
            {t('impact.jobsTitle')}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t('impact.jobsSubtitle')}
          </p>
          <div className="p-3 rounded-xl bg-white border border-rrr-blue-200 text-xs font-bold text-rrr-blue-950">
            {t('impact.jobsPriorityNotice')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsList.map((job, idx) => {
            const Icon = job.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-gray-200 shadow-sm space-y-2 flex flex-col justify-between hover:border-rrr-blue-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rrr-blue-100 text-rrr-blue-800 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-rrr-earth-900">
                    {t(job.titleKey)}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t(job.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Link to Job Interest Form in Contact Page */}
        <div className="text-center pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 py-3.5 rounded-2xl bg-rrr-blue-700 hover:bg-rrr-blue-800 text-white font-black text-sm shadow-lg shadow-rrr-blue-900/20 active:scale-[0.99] transition-all focus-ring text-center"
          >
            <span>{t('impact.btnApplyJob')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
