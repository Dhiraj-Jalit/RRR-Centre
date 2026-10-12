import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { collectionPointsData } from '../data/collectionPoints';
import CollectionStatusBadge from '../components/CollectionStatusBadge';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Building2, 
  Map, 
  Phone
} from 'lucide-react';

export default function CollectionPointsPage() {
  const { t } = useLanguage();
  const point = collectionPointsData[0];

  return (
    <div className="space-y-10 pb-8">
      {/* Header */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('points.pageTitle')}
        </h1>
        <p className="text-base text-gray-700 leading-relaxed">
          {t('points.pageSubtitle')}
        </p>

        {/* Live Saturday Status Banner */}
        <div className="max-w-xl mx-auto pt-2">
          <CollectionStatusBadge />
        </div>
      </section>

      {/* Central Collection Centre Card */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-3 border-rrr-green-600 p-6 sm:p-8 shadow-md space-y-6">
          <div className="space-y-5">
            {/* Header of Point */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rrr-green-700 text-white flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rrr-green-100 text-rrr-green-900">
                  {t(point.partnerKey)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-rrr-earth-900">
                  {t(point.nameKey)}
                </h2>
              </div>
            </div>

            {/* Timing Callout */}
            <div className="flex items-center gap-2.5 p-3.5 bg-rrr-green-50 rounded-2xl text-sm font-bold text-rrr-green-950 border border-rrr-green-200">
              <Clock className="w-5 h-5 text-rrr-green-700 shrink-0" />
              <span>{t('points.timingDetails')}</span>
            </div>

            {/* Address & Landmark */}
            <div className="space-y-2 text-sm text-gray-800 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-rrr-green-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base text-rrr-earth-900">{t(point.addressKey)}</p>
                  <p className="text-xs text-gray-600 mt-1 italic">{t(point.landmarkKey)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 pl-7 pt-1">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{t('common.helplineLabel')} {point.phone}</span>
              </div>
            </div>

            {/* Accepted & Not Accepted Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{t('points.acceptedLabel')}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                  {t('points.acceptedItems')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-900">
                  <XCircle className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{t('points.notAcceptedLabel')}</span>
                </div>
                <p className="text-xs sm:text-sm text-red-950 font-medium">
                  {t('points.notAcceptedItems')}
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-rrr-earth-100 p-5 text-center">
              <div className="flex flex-col items-center justify-center py-4 space-y-2">
                <Map className="w-10 h-10 text-gray-400" />
                <p className="text-xs font-bold text-gray-700">
                  {t('points.mapPlaceholderNotice')}
                </p>
                <span className="text-[11px] text-gray-500">
                  {t('points.gpsNotice')}
                </span>
              </div>
            </div>
          </div>

          {/* Get Directions Link */}
          <div className="pt-2">
            <a
              href={point.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full min-h-[50px] py-3 px-6 rounded-2xl bg-rrr-green-700 hover:bg-rrr-green-800 text-white font-bold text-base shadow-md transition-colors focus-ring"
            >
              <MapPin className="w-5 h-5 text-rrr-green-200" />
              <span>{t('points.btnDirections')}</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
