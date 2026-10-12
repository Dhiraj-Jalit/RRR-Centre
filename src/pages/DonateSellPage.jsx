import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FormField from '../components/FormField';
import { compressImage } from '../utils/imageCompressor';
import { saveDonation } from '../data/storage';
import { 
  HeartHandshake, 
  Upload, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  Calendar, 
  Tag, 
  ImageIcon, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DonateSellPage() {
  const { t } = useLanguage();

  const [intent, setIntent] = useState('donate'); // 'donate' | 'sell'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    category: '',
    itemName: '',
    quantity: '1',
    condition: 'good',
    price: '',
    description: '',
    dropoffPoint: 'btr-nagarpalika',
  });

  const [photoInfo, setPhotoInfo] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const categories = [
    { value: 'catClothes', label: t('donate.catClothes') },
    { value: 'catBooks', label: t('donate.catBooks') },
    { value: 'catElectronics', label: t('donate.catElectronics') },
    { value: 'catHousehold', label: t('donate.catHousehold') },
    { value: 'catUtensils', label: t('donate.catUtensils') },
    { value: 'catToys', label: t('donate.catToys') },
    { value: 'catCycles', label: t('donate.catCycles') },
    { value: 'catOther', label: t('donate.catOther') },
  ];

  const conditionOptions = [
    { value: 'new', label: t('donate.condNew') },
    { value: 'good', label: t('donate.condGood') },
    { value: 'needsRepair', label: t('donate.condNeedsRepair') },
  ];

  const dropoffOptions = [
    { value: 'btr-nagarpalika', label: t('donate.dropoffPoint1') },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, 1024, 0.7);
      setPhotoInfo(compressed);
      setErrors((prev) => ({ ...prev, photo: null }));
    } catch (err) {
      console.error('Image compression error:', err);
      setErrors((prev) => ({ ...prev, photo: t('common.validation.photoCompressError') }));
    } finally {
      setIsCompressing(false);
    }
  };

  const removePhoto = () => {
    setPhotoInfo(null);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('common.validation.nameRequired');
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = t('common.validation.phoneRequired');
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = t('common.validation.phoneInvalid');
    }

    if (!formData.village.trim()) {
      newErrors.village = t('common.validation.villageRequired');
    }

    if (!formData.category) {
      newErrors.category = t('common.validation.categoryRequired');
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = t('common.validation.itemNameRequired');
    }

    const qtyNum = parseInt(formData.quantity, 10);
    if (isNaN(qtyNum) || qtyNum < 1) {
      newErrors.quantity = t('common.validation.quantityRequired');
    }

    if (!formData.condition) {
      newErrors.condition = t('common.validation.conditionRequired');
    }

    if (intent === 'sell') {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = t('common.validation.priceRequired');
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = t('common.validation.descriptionRequired');
    }

    if (!formData.dropoffPoint) {
      newErrors.dropoffPoint = t('common.validation.dropoffPointRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to top of form
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveDonation({
        ...formData,
        intent,
        photoDataUrl: photoInfo ? photoInfo.dataUrl : null
      });

      setSubmissionSuccess(result);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      village: '',
      category: '',
      itemName: '',
      quantity: '1',
      condition: 'good',
      price: '',
      description: '',
      dropoffPoint: 'btr-nagarpalika',
    });
    setPhotoInfo(null);
    setSubmissionSuccess(null);
    setErrors({});
  };

  const copyRefNumber = () => {
    if (submissionSuccess?.referenceNumber) {
      navigator.clipboard?.writeText(submissionSuccess.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('donate.pageTitle')}
        </h1>
        <p className="text-base text-gray-700">
          {t('donate.pageSubtitle')}
        </p>
      </div>

      {/* Success View */}
      {submissionSuccess ? (
        <div className="bg-white rounded-3xl border-3 border-emerald-500 p-6 sm:p-8 shadow-xl text-center space-y-6 animate-none">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-emerald-950">
              {t('donate.successHeading')}
            </h2>
            <p className="text-sm text-gray-600">
              {t('donate.refNumberLabel')}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-rrr-green-900 tracking-wider bg-rrr-green-50 px-4 py-2 rounded-xl border border-rrr-green-300">
                {submissionSuccess.referenceNumber}
              </span>
              <button
                type="button"
                onClick={copyRefNumber}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus-ring"
                title="Copy reference code"
                aria-label="Copy reference code"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copiedRef && (
              <p className="text-xs font-semibold text-emerald-700">{t('donate.copiedToast')}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-2 text-sm text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>{t('donate.saturdayInstructionsTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {t('donate.successGuidance')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-white border-2 border-rrr-green-700 text-rrr-green-900 font-bold text-sm hover:bg-rrr-green-50 focus-ring transition-colors"
            >
              {t('donate.btnSubmitAnother')}
            </button>
            <Link
              to="/marketplace"
              className="flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-rrr-green-700 text-white font-bold text-sm hover:bg-rrr-green-800 shadow-md focus-ring transition-colors"
            >
              <span>{t('donate.btnGoToMarket')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Form View */
        <form 
          onSubmit={handleSubmit} 
          noValidate 
          className="bg-white rounded-3xl border-2 border-rrr-green-700/20 p-5 sm:p-8 shadow-sm space-y-6"
        >
          {/* Intent Selector (Donate vs Sell) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-rrr-earth-900">
              {t('donate.intentQuestion')} <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t('donate.intentQuestion')}>
              <button
                type="button"
                role="radio"
                aria-checked={intent === 'donate'}
                onClick={() => setIntent('donate')}
                className={`min-h-[50px] p-3 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all focus-ring ${
                  intent === 'donate'
                    ? 'border-rrr-green-700 bg-rrr-green-100/70 text-rrr-green-950 shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HeartHandshake className="w-5 h-5 text-rrr-green-700" />
                <span>{t('donate.optDonate')}</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={intent === 'sell'}
                onClick={() => setIntent('sell')}
                className={`min-h-[50px] p-3 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all focus-ring ${
                  intent === 'sell'
                    ? 'border-rrr-blue-700 bg-rrr-blue-100/70 text-rrr-blue-950 shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Tag className="w-5 h-5 text-rrr-blue-700" />
                <span>{t('donate.optSell')}</span>
              </button>
            </div>
          </div>

          {/* Conditional Low Price Field when Selling */}
          {intent === 'sell' && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-300 space-y-3">
              <FormField
                id="price"
                label={t('donate.priceLabel')}
                type="number"
                min="5"
                max="5000"
                step="5"
                required={true}
                placeholder="e.g. 150"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                helpText={t('donate.priceHelp')}
              />
            </div>
          )}

          {/* User Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="name"
              label={t('donate.nameLabel')}
              required={true}
              placeholder="e.g. Sachin Gaikwad"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormField
              id="phone"
              label={t('donate.phoneLabel')}
              type="tel"
              required={true}
              placeholder="98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              helpText={t('donate.phoneHelp')}
            />
          </div>

          <FormField
            id="village"
            label={t('donate.villageLabel')}
            required={true}
            placeholder={t('donate.villageHelp')}
            value={formData.village}
            onChange={handleChange}
            error={errors.village}
          />

          <hr className="border-gray-200" />

          {/* Item Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="category"
              label={t('donate.categoryLabel')}
              type="select"
              required={true}
              placeholder={t('donate.catSelectPlaceholder')}
              options={categories}
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
            />

            <FormField
              id="itemName"
              label={t('donate.itemNameLabel')}
              required={true}
              placeholder={t('donate.itemNamePlaceholder')}
              value={formData.itemName}
              onChange={handleChange}
              error={errors.itemName}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="quantity"
              label={t('donate.quantityLabel')}
              type="number"
              min="1"
              max="50"
              required={true}
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
            />

            <FormField
              id="condition"
              label={t('donate.conditionLabel')}
              type="select"
              required={true}
              options={conditionOptions}
              value={formData.condition}
              onChange={handleChange}
              error={errors.condition}
            />
          </div>

          <FormField
            id="description"
            label={t('donate.descLabel')}
            type="textarea"
            rows={3}
            required={true}
            placeholder={t('donate.descPlaceholder')}
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          {/* Client-side Compressed Image Upload (Max 2MB) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-rrr-earth-900">
              {t('donate.photoLabel')} <span className="text-xs font-normal text-gray-500">({t('common.optional')})</span>
            </label>
            <p className="text-xs text-gray-600">
              {t('donate.photoHelp')}
            </p>

            {photoInfo ? (
              <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-300 rounded-2xl">
                <img
                  src={photoInfo.dataUrl}
                  alt="Item preview"
                  className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                />
                <div className="flex-1 text-xs space-y-0.5">
                  <p className="font-bold text-gray-800 truncate max-w-[200px]">{photoInfo.name}</p>
                  <p className="text-gray-500">Size: {photoInfo.sizeInKb} KB (compressed)</p>
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl focus-ring"
                  aria-label="Remove photo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-gray-300 hover:border-rrr-green-600 rounded-2xl cursor-pointer bg-gray-50/60 transition-colors focus-ring">
                <Upload className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-sm font-bold text-rrr-green-800">
                  {isCompressing ? t('donate.photoCompressing') : t('donate.photoUploadPrompt')}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  {t('donate.photoFormats')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={isCompressing}
                  className="sr-only"
                />
              </label>
            )}
            {errors.photo && (
              <p className="text-xs text-red-600 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.photo}</span>
              </p>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Saturday Drop-off Choice */}
          <div className="space-y-2">
            <FormField
              id="dropoffPoint"
              label={t('donate.dropoffLabel')}
              type="select"
              required={true}
              options={dropoffOptions}
              value={formData.dropoffPoint}
              onChange={handleChange}
              error={errors.dropoffPoint}
              helpText={t('donate.dropoffTimingsNotice')}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isCompressing}
              className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-rrr-green-700 hover:bg-rrr-green-800 disabled:bg-gray-400 text-white font-black text-base shadow-lg shadow-rrr-green-900/20 active:scale-[0.99] transition-all focus-ring text-center"
            >
              {isSubmitting ? t('common.btnSubmitting') : t('donate.submitBtn')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
