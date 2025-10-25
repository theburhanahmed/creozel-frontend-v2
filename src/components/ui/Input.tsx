import React, { useState, forwardRef, useId } from 'react';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'underlined';
  hideLabel?: boolean;
  containerClassName?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  startIcon,
  endIcon,
  fullWidth = false,
  variant = 'outlined',
  hideLabel = false,
  className = '',
  containerClassName = '',
  id,
  type = 'text',
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${useId()}`;
  // Determine if this is a password field
  const isPassword = type === 'password';
  // Determine actual input type (for password toggling)
  const actualType = isPassword && showPassword ? 'text' : type;
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Base styles for all variants
  const baseStyles = `
      block w-full rounded-md bg-transparent transition-all duration-200
      disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
      ${fullWidth ? 'w-full' : ''}
    `;
  // Variant-specific styles
  const variantStyles = {
    outlined: `
        border border-gray-300 dark:border-gray-700 
        focus:border-green-500 dark:focus:border-green-500
        ${error ? 'border-red-500 dark:border-red-500' : ''}
        py-2 px-3 text-gray-900 dark:text-white
      `,
    filled: `
        border border-transparent bg-gray-100 dark:bg-gray-800 
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:bg-white dark:focus:bg-gray-900
        ${error ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500' : ''}
        py-2.5 px-3 text-gray-900 dark:text-white
      `,
    underlined: `
        border-b-2 border-gray-300 dark:border-gray-700 rounded-none px-1 py-1.5
        focus:border-green-500 dark:focus:border-green-500
        ${error ? 'border-red-500 dark:border-red-500' : ''}
        text-gray-900 dark:text-white
      `
  };
  // Icon container styles
  const iconContainerStyles = `
      absolute inset-y-0 flex items-center pointer-events-none text-gray-500 dark:text-gray-400
      ${variant === 'underlined' ? 'bottom-1.5 top-auto' : ''}
    `;
  return <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {/* Label */}
        {label && !hideLabel && <label htmlFor={inputId} className={`
              block text-sm font-medium mb-1.5
              ${disabled ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}
              ${error ? 'text-red-500 dark:text-red-400' : ''}
            `}>
            {label}
          </label>}
        {/* Input container */}
        <div className="relative">
          {/* Start icon */}
          {startIcon && <div className={`${iconContainerStyles} left-3`}>{startIcon}</div>}
          {/* Input element */}
          <input ref={ref} id={inputId} type={actualType} disabled={disabled} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined} className={`
              ${baseStyles}
              ${variantStyles[variant]}
              ${startIcon ? 'pl-10' : ''}
              ${endIcon || isPassword ? 'pr-10' : ''}
              ${className}
            `} placeholder={label && hideLabel ? label : props.placeholder} {...props} />
          {/* End icon or password toggle */}
          {(endIcon || isPassword) && <div className={`
                absolute inset-y-0 right-0 flex items-center pr-3
                ${variant === 'underlined' ? 'bottom-1.5 top-auto' : ''}
                ${isPassword ? 'cursor-pointer' : 'pointer-events-none'}
              `} onClick={isPassword ? togglePasswordVisibility : undefined} role={isPassword ? 'button' : undefined} tabIndex={isPassword ? 0 : undefined} aria-label={isPassword ? showPassword ? 'Hide password' : 'Show password' : undefined}>
              {isPassword ? showPassword ? <EyeOffIcon size={18} className="text-gray-500 dark:text-gray-400" /> : <EyeIcon size={18} className="text-gray-500 dark:text-gray-400" /> : endIcon}
            </div>}
          {/* Error icon */}
          {error && !endIcon && !isPassword && <div className={`${iconContainerStyles} right-3`}>
              <AlertCircleIcon size={18} className="text-red-500 dark:text-red-400" />
            </div>}
        </div>
        {/* Helper text or error message */}
        {(helperText || error) && <div className="mt-1.5">
            {error ? <p id={`${inputId}-error`} className="text-sm text-red-500 dark:text-red-400">
                {error}
              </p> : helperText ? <p id={`${inputId}-helper`} className="text-sm text-gray-500 dark:text-gray-400">
                {helperText}
              </p> : null}
          </div>}
      </div>;
});
Input.displayName = 'Input';