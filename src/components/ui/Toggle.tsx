import React, { forwardRef, useId } from 'react';
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'pill';
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  className?: string;
  toggleClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  variant = 'default',
  labelPosition = 'right',
  disabled = false,
  readOnly = false,
  error,
  className = '',
  toggleClassName = '',
  labelClassName = '',
  descriptionClassName = '',
  id,
  ...props
}, ref) => {
  const uniqueId = id || `toggle-${useId()}`;
  // Handle toggle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly) {
      onChange(e.target.checked);
    }
  };
  // Handle click on label or description
  const handleLabelClick = () => {
    if (!disabled && !readOnly) {
      onChange(!checked);
    }
  };
  // Size classes
  const sizeClasses = {
    sm: {
      track: 'w-7 h-4',
      thumb: 'w-3 h-3',
      thumbTranslate: 'translate-x-3',
      label: 'text-sm'
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      thumbTranslate: 'translate-x-5',
      label: 'text-sm'
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      thumbTranslate: 'translate-x-6',
      label: 'text-base'
    }
  };
  // Variant classes
  const variantClasses = {
    default: {
      track: {
        on: 'bg-green-500 dark:bg-green-600',
        off: 'bg-gray-300 dark:bg-gray-600'
      },
      thumb: {
        on: 'bg-white',
        off: 'bg-white'
      }
    },
    outline: {
      track: {
        on: 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-500',
        off: 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
      },
      thumb: {
        on: 'bg-green-500 dark:bg-green-400',
        off: 'bg-gray-500 dark:bg-gray-400'
      }
    },
    pill: {
      track: {
        on: 'bg-green-500 dark:bg-green-600',
        off: 'bg-gray-300 dark:bg-gray-600'
      },
      thumb: {
        on: 'bg-white scale-90',
        off: 'bg-white scale-90'
      }
    }
  };
  // Error classes
  const errorClasses = error ? 'border-red-500 dark:border-red-500' : '';
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return <div className={`inline-flex ${className}`}>
        <div className={`
            flex items-center
            ${labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}>
          {/* Label (left position) */}
          {label && labelPosition === 'left' && <label htmlFor={uniqueId} className={`
                ${sizeClasses[size].label}
                font-medium
                text-gray-700 dark:text-gray-300
                mr-2
                ${disabled ? 'opacity-50' : ''}
                ${labelClassName}
              `} onClick={handleLabelClick}>
              {label}
            </label>}
          {/* Toggle switch */}
          <div className={`relative inline-block ${toggleClassName}`}>
            <input ref={ref} type="checkbox" id={uniqueId} checked={checked} onChange={handleChange} disabled={disabled || readOnly} className="sr-only" aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${uniqueId}-error` : undefined} {...props} />
            <div className={`
                ${sizeClasses[size].track}
                ${checked ? variantClasses[variant].track.on : variantClasses[variant].track.off}
                ${variant === 'pill' ? 'rounded-full' : 'rounded-full'}
                ${disabledClasses}
                ${errorClasses}
                transition-colors duration-200 ease-in-out
              `} role="presentation">
              <div className={`
                  ${sizeClasses[size].thumb}
                  ${checked ? variantClasses[variant].thumb.on : variantClasses[variant].thumb.off}
                  ${variant === 'pill' ? 'rounded-full' : 'rounded-full'}
                  transform ${checked ? sizeClasses[size].thumbTranslate : 'translate-x-0.5'}
                  transition-transform duration-200 ease-in-out
                  shadow-sm
                  absolute top-0.5
                `} />
            </div>
          </div>
          {/* Label (right position) and description */}
          <div className={`${labelPosition === 'left' ? 'mr-auto' : 'ml-2'}`}>
            {label && labelPosition === 'right' && <label htmlFor={uniqueId} className={`
                  ${sizeClasses[size].label}
                  font-medium
                  text-gray-700 dark:text-gray-300
                  ${disabled ? 'opacity-50' : ''}
                  ${labelClassName}
                `} onClick={handleLabelClick}>
                {label}
              </label>}
            {description && <p className={`
                  text-sm text-gray-500 dark:text-gray-400 mt-0.5
                  ${disabled ? 'opacity-50' : ''}
                  ${descriptionClassName}
                `} onClick={handleLabelClick}>
                {description}
              </p>}
          </div>
        </div>
        {/* Error message */}
        {error && <p id={`${uniqueId}-error`} className="mt-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </p>}
      </div>;
});
Toggle.displayName = 'Toggle';