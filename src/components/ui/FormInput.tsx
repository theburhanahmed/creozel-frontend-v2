import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  const hasError = !!error;
  const hasSuccess = !!success;
  return <div className="w-full">
        {label && <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>}
          </label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>}
          <input ref={ref} className={cn('w-full px-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500', 'transition-all duration-200', 'focus:outline-none focus:ring-2 focus:ring-offset-0', leftIcon && 'pl-12', rightIcon && 'pr-12', hasError && 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500/20', hasSuccess && 'border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500/20', !hasError && !hasSuccess && 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20', props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900', className)} aria-invalid={hasError} aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined} {...props} />
          {(rightIcon || hasError || hasSuccess) && <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {hasError && <AlertCircleIcon size={20} className="text-red-500" aria-hidden="true" />}
              {hasSuccess && !hasError && <CheckCircleIcon size={20} className="text-green-500" aria-hidden="true" />}
              {!hasError && !hasSuccess && rightIcon}
            </div>}
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
FormInput.displayName = 'FormInput';