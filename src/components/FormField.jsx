import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle } from 'lucide-react';

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  helpText,
  required = false,
  placeholder,
  options = [],
  rows = 3,
  disabled = false,
  min,
  max,
  step,
  children
}) {
  const { t } = useLanguage();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={id} 
          className="block text-sm font-bold text-rrr-earth-900"
        >
          {label}{' '}
          {required ? (
            <span className="text-red-600 font-bold" aria-hidden="true">*</span>
          ) : (
            <span className="text-xs font-normal text-gray-500">({t('common.optional')})</span>
          )}
        </label>
      </div>

      {children ? (
        children
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helpText ? helpId : undefined}
          required={required}
          className={`w-full p-3 text-base rounded-xl border-2 transition-colors focus-ring disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 bg-red-50/50 text-red-950 focus:border-red-600'
              : 'border-gray-300 bg-white text-rrr-earth-900 focus:border-rrr-blue-600'
          }`}
        />
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helpText ? helpId : undefined}
            required={required}
            className={`w-full min-h-[48px] p-3 text-base rounded-xl border-2 transition-colors focus-ring appearance-none bg-white text-rrr-earth-900 ${
              error
                ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                : 'border-gray-300 focus:border-rrr-blue-600'
            }`}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helpText ? helpId : undefined}
          required={required}
          className={`w-full min-h-[48px] p-3 text-base rounded-xl border-2 transition-colors focus-ring disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 bg-red-50/50 text-red-950 focus:border-red-600'
              : 'border-gray-300 bg-white text-rrr-earth-900 focus:border-rrr-blue-600'
          }`}
        />
      )}

      {helpText && !error && (
        <p id={helpId} className="text-xs text-gray-600 leading-tight">
          {helpText}
        </p>
      )}

      {error && (
        <p 
          id={errorId} 
          role="alert" 
          className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 p-2 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
