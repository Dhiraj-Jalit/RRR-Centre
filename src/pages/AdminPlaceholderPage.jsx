import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getStorageMetrics } from '../data/storage';
import { 
  ShieldAlert, 
  Database, 
  Lock, 
  Layers, 
  Package, 
  MessageSquare, 
  Briefcase, 
  ArrowLeft 
} from 'lucide-react';

export default function AdminPlaceholderPage() {
  const { t } = useLanguage();
  const metrics = getStorageMetrics();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      {/* Extension Notice Header */}
      <div className="bg-white rounded-3xl border-3 border-amber-500 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                {t('admin.roadmapPill')}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-rrr-earth-900 mt-1">
              {t('admin.pageTitle')}
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {t('admin.extensionNotice')}
        </p>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
          <p className="font-bold">{t('admin.archExtensionTitle')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('admin.extDataService')}</li>
            <li>{t('admin.extRouteGuard')}</li>
            <li>{t('admin.extOfflineStore')}</li>
          </ul>
        </div>
      </div>

      {/* Local Session Activity Metrics */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-rrr-earth-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-rrr-blue-700" />
          <span>{t('admin.statsTitle')}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-rrr-green-50 border border-rrr-green-200">
            <Package className="w-5 h-5 text-rrr-green-700 mx-auto mb-1" />
            <p className="text-2xl font-black text-rrr-green-950">{metrics.donationsCount}</p>
            <p className="text-[11px] font-semibold text-rrr-green-800">{t('admin.donationsLogged')}</p>
          </div>

          <div className="p-3 rounded-2xl bg-rrr-blue-50 border border-rrr-blue-200">
            <Layers className="w-5 h-5 text-rrr-blue-700 mx-auto mb-1" />
            <p className="text-2xl font-black text-rrr-blue-950">{metrics.enquiriesCount}</p>
            <p className="text-[11px] font-semibold text-rrr-blue-800">{t('admin.enquiriesLogged')}</p>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
            <MessageSquare className="w-5 h-5 text-purple-700 mx-auto mb-1" />
            <p className="text-2xl font-black text-purple-950">{metrics.contactsCount}</p>
            <p className="text-[11px] font-semibold text-purple-800">{t('admin.contactsLogged')}</p>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200">
            <Briefcase className="w-5 h-5 text-orange-700 mx-auto mb-1" />
            <p className="text-2xl font-black text-orange-950">{metrics.jobsCount}</p>
            <p className="text-[11px] font-semibold text-orange-800">{t('admin.jobsLogged')}</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-rrr-earth-900 text-white font-bold text-xs hover:bg-black focus-ring"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('admin.btnBackHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
