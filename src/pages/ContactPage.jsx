import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FormField from '../components/FormField';
import { saveContactMessage, saveJobApplication } from '../data/storage';
import { 
  PhoneCall, 
  Briefcase, 
  Building2, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send,
  Users
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'jobs'

  // General Form State
  const [generalData, setGeneralData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [generalErrors, setGeneralErrors] = useState({});
  const [generalSubmitting, setGeneralSubmitting] = useState(false);
  const [generalSuccess, setGeneralSuccess] = useState(false);

  // Job Application Form State
  const [jobData, setJobData] = useState({
    name: '',
    phone: '',
    village: '',
    skills: '',
    availability: ''
  });
  const [jobErrors, setJobErrors] = useState({});
  const [jobSubmitting, setJobSubmitting] = useState(false);
  const [jobSuccess, setJobSuccess] = useState(false);

  const subjectOptions = [
    { value: 'donation', label: t('contact.subDonation') },
    { value: 'selling', label: t('contact.subSelling') },
    { value: 'volunteering', label: t('contact.subVolunteering') },
    { value: 'job', label: t('contact.subJob') },
    { value: 'partnership', label: t('contact.subPartnership') },
    { value: 'other', label: t('contact.subOther') },
  ];

  const availabilityOptions = [
    { value: 'saturdays', label: t('contact.availSaturday') },
    { value: 'part_time', label: t('contact.availPartTime') },
    { value: 'full_time', label: t('contact.availFullTime') },
  ];

  // General Form Handlers
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: value }));
    if (generalErrors[name]) {
      setGeneralErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateGeneral = () => {
    const errs = {};
    if (!generalData.name.trim()) errs.name = t('common.validation.nameRequired');
    
    const cleanPhone = generalData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = t('common.validation.phoneRequired');
    } else if (cleanPhone.length !== 10) {
      errs.phone = t('common.validation.phoneInvalid');
    }

    if (generalData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(generalData.email.trim())) {
        errs.email = t('common.validation.emailInvalid');
      }
    }

    if (!generalData.subject) errs.subject = t('common.validation.subjectRequired');
    if (!generalData.message.trim()) errs.message = t('common.validation.messageRequired');

    setGeneralErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    if (!validateGeneral()) return;

    setGeneralSubmitting(true);
    try {
      await saveContactMessage(generalData);
      setGeneralSuccess(true);
      setGeneralData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
    } finally {
      setGeneralSubmitting(false);
    }
  };

  // Job Form Handlers
  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
    if (jobErrors[name]) {
      setJobErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateJob = () => {
    const errs = {};
    if (!jobData.name.trim()) errs.name = t('common.validation.nameRequired');
    
    const cleanPhone = jobData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = t('common.validation.phoneRequired');
    } else if (cleanPhone.length !== 10) {
      errs.phone = t('common.validation.phoneInvalid');
    }

    if (!jobData.village.trim()) errs.village = t('common.validation.villageRequired');
    if (!jobData.skills.trim()) errs.skills = t('common.validation.skillsRequired');
    if (!jobData.availability) errs.availability = t('common.validation.availabilityRequired');

    setJobErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!validateJob()) return;

    setJobSubmitting(true);
    try {
      await saveJobApplication(jobData);
      setJobSuccess(true);
      setJobData({ name: '', phone: '', village: '', skills: '', availability: '' });
    } catch (err) {
      console.error('Job application submit error:', err);
    } finally {
      setJobSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pb-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <section className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-black text-rrr-earth-900 tracking-tight">
          {t('contact.pageTitle')}
        </h1>
        <p className="text-base text-gray-700">
          {t('contact.pageSubtitle')}
        </p>
      </section>

      {/* Tab Switcher */}
      <div className="flex p-1 bg-gray-100 rounded-2xl max-w-md mx-auto border border-gray-300">
        <button
          type="button"
          onClick={() => { setActiveTab('general'); setGeneralSuccess(false); }}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors focus-ring ${
            activeTab === 'general'
              ? 'bg-white text-rrr-green-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>{t('contact.tabGeneral')}</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('jobs'); setJobSuccess(false); }}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors focus-ring ${
            activeTab === 'jobs'
              ? 'bg-white text-rrr-blue-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>{t('contact.tabJobs')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container (2 cols) */}
        <div className="lg:col-span-2">
          {activeTab === 'general' ? (
            /* General Contact Form */
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-rrr-earth-900">
                  {t('contact.generalFormTitle')}
                </h2>
                <p className="text-xs text-gray-600">
                  {t('contact.reviewNotice')}
                </p>
              </div>

              {generalSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="text-base font-bold text-emerald-950">
                    {t('contact.contactSuccess')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setGeneralSuccess(false)}
                    className="min-h-[44px] px-5 py-2 bg-rrr-green-700 text-white font-bold text-sm rounded-xl focus-ring"
                  >
                    {t('contact.btnSendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGeneralSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      id="name"
                      label={t('contact.nameLabel')}
                      required={true}
                      placeholder="e.g. Rahul Wankhede"
                      value={generalData.name}
                      onChange={handleGeneralChange}
                      error={generalErrors.name}
                    />

                    <FormField
                      id="phone"
                      label={t('contact.phoneLabel')}
                      type="tel"
                      required={true}
                      placeholder="98XXXXXXXX"
                      value={generalData.phone}
                      onChange={handleGeneralChange}
                      error={generalErrors.phone}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      id="email"
                      label={t('contact.emailLabel')}
                      type="email"
                      placeholder="name@example.com"
                      value={generalData.email}
                      onChange={handleGeneralChange}
                      error={generalErrors.email}
                    />

                    <FormField
                      id="subject"
                      label={t('contact.subjectLabel')}
                      type="select"
                      required={true}
                      placeholder={t('contact.subSelect')}
                      options={subjectOptions}
                      value={generalData.subject}
                      onChange={handleGeneralChange}
                      error={generalErrors.subject}
                    />
                  </div>

                  <FormField
                    id="message"
                    label={t('contact.messageLabel')}
                    type="textarea"
                    rows={4}
                    required={true}
                    placeholder={t('contact.messagePlaceholder')}
                    value={generalData.message}
                    onChange={handleGeneralChange}
                    error={generalErrors.message}
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={generalSubmitting}
                      className="w-full min-h-[50px] py-3 px-6 rounded-2xl bg-rrr-green-700 hover:bg-rrr-green-800 disabled:bg-gray-400 text-white font-bold text-base shadow-md transition-all focus-ring flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{generalSubmitting ? t('common.btnSubmitting') : t('common.btnSubmit')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Job / Volunteer Interest Form */
            <div className="bg-white rounded-3xl border-2 border-rrr-blue-300 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rrr-blue-100 text-rrr-blue-900 text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('contact.jobsDeskBadge')}</span>
                </div>
                <h2 className="text-xl font-black text-rrr-earth-900">
                  {t('contact.jobFormTitle')}
                </h2>
                <p className="text-xs text-gray-600">
                  {t('contact.jobFormDesc')}
                </p>
              </div>

              {jobSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="text-base font-bold text-emerald-950">
                    {t('contact.jobSuccess')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setJobSuccess(false)}
                    className="min-h-[44px] px-5 py-2 bg-rrr-blue-700 text-white font-bold text-sm rounded-xl focus-ring"
                  >
                    {t('contact.btnSubmitAnotherJob')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleJobSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      id="name"
                      label={t('contact.nameLabel')}
                      required={true}
                      placeholder="e.g. Sunita Deshmukh"
                      value={jobData.name}
                      onChange={handleJobChange}
                      error={jobErrors.name}
                    />

                    <FormField
                      id="phone"
                      label={t('contact.phoneLabel')}
                      type="tel"
                      required={true}
                      placeholder="98XXXXXXXX"
                      value={jobData.phone}
                      onChange={handleJobChange}
                      error={jobErrors.phone}
                    />
                  </div>

                  <FormField
                    id="village"
                    label={t('contact.villageLabel')}
                    required={true}
                    placeholder={t('contact.villagePlaceholder')}
                    value={jobData.village}
                    onChange={handleJobChange}
                    error={jobErrors.village}
                  />

                  <FormField
                    id="skills"
                    label={t('contact.skillsLabel')}
                    type="textarea"
                    rows={3}
                    required={true}
                    placeholder={t('contact.skillsPlaceholder')}
                    value={jobData.skills}
                    onChange={handleJobChange}
                    error={jobErrors.skills}
                    helpText={t('contact.skillsHelp')}
                  />

                  <FormField
                    id="availability"
                    label={t('contact.availabilityLabel')}
                    type="select"
                    required={true}
                    placeholder={t('contact.availSelect')}
                    options={availabilityOptions}
                    value={jobData.availability}
                    onChange={handleJobChange}
                    error={jobErrors.availability}
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={jobSubmitting}
                      className="w-full min-h-[50px] py-3 px-6 rounded-2xl bg-rrr-blue-700 hover:bg-rrr-blue-800 disabled:bg-gray-400 text-white font-bold text-base shadow-md transition-all focus-ring flex items-center justify-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{jobSubmitting ? t('common.btnSubmitting') : t('common.btnSubmit')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Office Contact Coordinates Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rrr-green-800 font-bold text-base">
              <Building2 className="w-5 h-5 text-rrr-green-700" />
              <span>{t('contact.officeTitle')}</span>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                <p className="leading-snug">{t('contact.officeAddress')}</p>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                <p className="text-xs leading-relaxed">{t('contact.officeTiming')}</p>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 pt-1 border-t border-gray-100">
                <PhoneCall className="w-4 h-4 text-rrr-green-700" />
                <span>{t('contact.officePhone')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1.5">
            <p className="font-bold">{t('contact.residentNoticeTitle')}</p>
            <p className="leading-relaxed">
              {t('contact.residentNoticeDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
