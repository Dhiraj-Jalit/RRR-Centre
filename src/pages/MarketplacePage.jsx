import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getMarketplaceListings, saveItemEnquiry } from '../data/storage';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import { 
  ShoppingBag, 
  Filter, 
  RotateCcw, 
  Tag, 
  MapPin, 
  CheckCircle2, 
  MessageSquare,
  PackageCheck,
  AlertCircle
} from 'lucide-react';

export default function MarketplacePage() {
  const { t, language } = useLanguage();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [freeOnly, setFreeOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);

  // Enquiry Modal States
  const [activeItem, setActiveItem] = useState(null);
  const [enqFormData, setEnqFormData] = useState({ name: '', phone: '', message: '' });
  const [enqErrors, setEnqErrors] = useState({});
  const [enqSubmitting, setEnqSubmitting] = useState(false);
  const [enqSuccess, setEnqSuccess] = useState(false);

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      try {
        const data = await getMarketplaceListings();
        setItems(data);
      } catch (err) {
        console.error('Failed to load listings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  const categories = [
    { value: 'all', label: t('market.filterAll') },
    { value: 'catClothes', label: t('donate.catClothes') },
    { value: 'catBooks', label: t('donate.catBooks') },
    { value: 'catElectronics', label: t('donate.catElectronics') },
    { value: 'catHousehold', label: t('donate.catHousehold') },
    { value: 'catUtensils', label: t('donate.catUtensils') },
    { value: 'catToys', label: t('donate.catToys') },
    { value: 'catCycles', label: t('donate.catCycles') },
    { value: 'catOther', label: t('donate.catOther') },
  ];

  const conditions = [
    { value: 'all', label: t('market.filterAllConditions') },
    { value: 'new', label: t('donate.condNew') },
    { value: 'good', label: t('donate.condGood') },
    { value: 'needsRepair', label: t('donate.condNeedsRepair') },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
        return false;
      }
      if (freeOnly && !item.isDonation) {
        return false;
      }
      if (!freeOnly && !item.isDonation && item.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [items, selectedCategory, selectedCondition, freeOnly, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setFreeOnly(false);
    setMaxPrice(500);
  };

  const handleOpenEnquire = (item) => {
    setActiveItem(item);
    setEnqFormData({ name: '', phone: '', message: '' });
    setEnqErrors({});
    setEnqSuccess(false);
  };

  const handleEnqChange = (e) => {
    const { name, value } = e.target;
    setEnqFormData((prev) => ({ ...prev, [name]: value }));
    if (enqErrors[name]) {
      setEnqErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateEnquiry = () => {
    const errs = {};
    if (!enqFormData.name.trim()) {
      errs.name = t('common.validation.nameRequired');
    }
    const cleanPhone = enqFormData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = t('common.validation.phoneRequired');
    } else if (cleanPhone.length !== 10) {
      errs.phone = t('common.validation.phoneInvalid');
    }
    if (!enqFormData.message.trim()) {
      errs.message = t('common.validation.messageRequired');
    }
    setEnqErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnqSubmit = async (e) => {
    e.preventDefault();
    if (!validateEnquiry()) return;

    setEnqSubmitting(true);
    try {
      await saveItemEnquiry({
        itemId: activeItem.id,
        itemRef: activeItem.refNumber,
        itemTitle: typeof activeItem.title === 'object' ? activeItem.title[language] || activeItem.title.en : activeItem.title,
        ...enqFormData
      });
      setEnqSuccess(true);
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
    } finally {
      setEnqSubmitting(false);
    }
  };

  const getConditionLabel = (cond) => {
    if (cond === 'new') return t('donate.condNew');
    if (cond === 'good') return t('donate.condGood');
    if (cond === 'needsRepair') return t('donate.condNeedsRepair');
    return cond;
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <section className="text-center space-y-2 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('market.pageTitle')}
        </h1>
        <p className="text-base text-gray-700">
          {t('market.pageSubtitle')}
        </p>
      </section>

      {/* Filter Panel */}
      <section className="bg-white rounded-3xl border-2 border-gray-200 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-rrr-earth-900 text-sm">
            <Filter className="w-4 h-4 text-rrr-green-700" />
            <span>{t('market.filterTitle')}</span>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-rrr-green-800 p-1 focus-ring rounded"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('common.btnClearFilters')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Category Filter */}
          <div className="space-y-1">
            <label htmlFor="filter-cat" className="block text-xs font-bold text-gray-700">
              {t('market.filterCategory')}
            </label>
            <select
              id="filter-cat"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full min-h-[46px] px-3 py-2 text-sm rounded-xl border-2 border-gray-300 focus-ring bg-white"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="space-y-1">
            <label htmlFor="filter-cond" className="block text-xs font-bold text-gray-700">
              {t('market.filterCondition')}
            </label>
            <select
              id="filter-cond"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full min-h-[46px] px-3 py-2 text-sm rounded-xl border-2 border-gray-300 focus-ring bg-white"
            >
              {conditions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Free Items Toggle */}
          <div className="flex items-center min-h-[46px] pt-4 sm:pt-0">
            <label className="relative flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="w-5 h-5 rounded text-rrr-green-700 focus-ring accent-rrr-green-700"
              />
              <span className="text-sm font-bold text-rrr-earth-900">
                {t('market.filterFreeOnly')}
              </span>
            </label>
          </div>

          {/* Price Range Slider (active only if freeOnly is false) */}
          <div className={`space-y-1 ${freeOnly ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>{t('market.filterMaxPrice')} {maxPrice}</span>
              <span>₹500</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              disabled={freeOnly}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rrr-blue-700"
              aria-label={t('market.filterMaxPrice')}
            />
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500 font-semibold">
          {t('market.loading')}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-10 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-base font-bold text-gray-700">{t('market.emptyState')}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-rrr-green-700 text-white font-bold text-xs focus-ring"
          >
            {t('common.btnClearFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const itemTitle = typeof item.title === 'object' 
              ? item.title[language] || item.title.en 
              : item.title;
            const itemDesc = typeof item.description === 'object' 
              ? item.description[language] || item.description.en 
              : item.description;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-rrr-green-600 transition-colors"
              >
                <div>
                  {/* Photo Thumbnail or Fallback */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={itemTitle}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-rrr-earth-100 text-gray-400">
                        <ShoppingBag className="w-10 h-10 mb-1" />
                        <span className="text-xs">{t('market.placeholderItemName')}</span>
                      </div>
                    )}
                    {/* Price / Free Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                        item.isDonation 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-rrr-blue-700 text-white'
                      }`}>
                        {item.isDonation ? t('market.cardFree') : `₹ ${item.price}`}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-mono">{item.refNumber}</span>
                        <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                          {getConditionLabel(item.condition)}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-rrr-earth-900 leading-snug">
                        {itemTitle}
                      </h2>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {itemDesc}
                    </p>

                    <div className="pt-1 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-rrr-green-700 shrink-0" />
                        <span>{t(item.dropoffPointNameKey)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enquire Button */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEnquire(item)}
                    className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-rrr-green-700 hover:bg-rrr-green-800 text-white font-bold text-sm shadow-sm transition-colors focus-ring flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('market.btnEnquire')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Enquiry Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={`${t('market.modalTitle')} ${activeItem ? (typeof activeItem.title === 'object' ? activeItem.title[language] || activeItem.title.en : activeItem.title) : ''}`}
      >
        {enqSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-emerald-950">
              {t('market.enqSuccess')}
            </p>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="min-h-[44px] px-6 py-2.5 bg-rrr-green-700 text-white font-bold text-sm rounded-xl focus-ring"
            >
              {t('common.btnClose')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleEnqSubmit} noValidate className="space-y-4">
            <p className="text-xs text-gray-600">
              {t('market.modalSub')}
            </p>

            <FormField
              id="enqName"
              label={t('market.enqName')}
              required={true}
              placeholder="e.g. Anand Shinde"
              value={enqFormData.name}
              onChange={(e) => setEnqFormData({ ...enqFormData, name: e.target.value })}
              error={enqErrors.name}
            />

            <FormField
              id="enqPhone"
              label={t('market.enqPhone')}
              type="tel"
              required={true}
              placeholder="98XXXXXXXX"
              value={enqFormData.phone}
              onChange={(e) => setEnqFormData({ ...enqFormData, phone: e.target.value })}
              error={enqErrors.phone}
            />

            <FormField
              id="enqMessage"
              label={t('market.enqMessage')}
              type="textarea"
              rows={3}
              required={true}
              placeholder={t('market.enqPlaceholder')}
              value={enqFormData.message}
              onChange={(e) => setEnqFormData({ ...enqFormData, message: e.target.value })}
              error={enqErrors.message}
            />

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 focus-ring"
              >
                {t('common.btnCancel')}
              </button>
              <button
                type="submit"
                disabled={enqSubmitting}
                className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-rrr-green-700 hover:bg-rrr-green-800 disabled:bg-gray-400 text-white font-bold text-sm shadow-md focus-ring"
              >
                {enqSubmitting ? t('common.btnSubmitting') : t('common.btnSubmit')}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
