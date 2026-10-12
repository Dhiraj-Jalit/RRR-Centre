import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getCollectionScheduleStatus } from '../data/collectionPoints';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CollectionStatusBadge({ compact = false }) {
  const { t } = useLanguage();
  const status = getCollectionScheduleStatus();

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
        status.isOpenRightNow
          ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
          : status.isTodaySaturday
          ? 'bg-amber-100 text-amber-900 border-amber-400'
          : 'bg-rrr-blue-100 text-rrr-blue-900 border-rrr-blue-400'
      }`}>
        {status.isOpenRightNow ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('points.statusOpenBadge')}</span>
          </>
        ) : (
          <>
            <Clock className="w-3.5 h-3.5 text-rrr-blue-700" />
            <span>{status.isTodaySaturday ? t('points.statusClosedBadge') : t('points.timingDetails')}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border-2 shadow-sm ${
      status.isOpenRightNow
        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
        : status.isTodaySaturday
        ? 'bg-amber-50 border-amber-500 text-amber-950'
        : 'bg-blue-50 border-blue-400 text-blue-950'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
          status.isOpenRightNow ? 'bg-emerald-600 text-white' : 'bg-rrr-blue-700 text-white'
        }`}>
          {status.isOpenRightNow ? <CheckCircle2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              status.isOpenRightNow ? 'bg-emerald-200 text-emerald-900' : 'bg-blue-200 text-blue-900'
            }`}>
              {status.isOpenRightNow ? t('points.statusOpenBadge') : t('points.statusClosedBadge')}
            </span>
            <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {t('points.timingDetails')}
            </span>
          </div>

          <p className="text-sm font-medium">
            {status.isOpenRightNow ? (
              <span className="text-emerald-800 font-semibold">{t('points.todayStatusOpen')}</span>
            ) : (
              <span>
                {t('points.todayStatusClosed')}{' '}
                <strong className="underline text-rrr-blue-900">{status.formattedNextDate}</strong>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
