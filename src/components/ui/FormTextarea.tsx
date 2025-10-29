import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  label,
  error,
  success,
  helperText,
  showCharCount,
  maxLength,
  className,
  value,
  ...props
}, ref) => {
  const hasError = !!error;
  const hasSuccess = !!success;
  const charCount = value ? String(value).length : 0;
  return <div className="w-full">
        {label && <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              {label}
              {props.required && <span className="text-red-500 ml-1" aria-label="required">
                  *
                </span>}
            </label>
            {showCharCount && <span className="text-xs text-gray-500 dark:text-gray-400">
                {charCount}
                {maxLength && ` / ${maxLength}`}
              </span>}
          </div>}
        <div className="relative">
          <textarea ref={ref} value={value} maxLength={maxLength} className={cn('w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500', 'transition-all duration-200 resize-none', 'focus:outline-none focus:ring-2 focus:ring-offset-0', hasError && 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/20', hasSuccess && 'border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500/20', !hasError && !hasSuccess && 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20', props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900', className)} aria-invalid={hasError} aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined} {...props} />
        </div>
        {error && <p id={`${props.id}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
            <AlertCircleIcon size={14} />
            {error}
          </p>}
        {success && !error && <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircleIcon size={14} />
            {success}
          </p>}
        {helperText && !error && !success && <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>}
      </div>;
});
FormTextarea.displayName = 'FormTextarea';