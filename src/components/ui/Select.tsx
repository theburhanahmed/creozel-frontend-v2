import React, { useEffect, useState, useRef, forwardRef, useId } from 'react';
import { ChevronDownIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { FocusTrap } from './AccessibilityUtils';
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'underlined';
  className?: string;
  menuClassName?: string;
  hideLabel?: boolean;
  name?: string;
  id?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
}
export const Select = forwardRef<HTMLDivElement, SelectProps>(({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'md',
  variant = 'outlined',
  className = '',
  menuClassName = '',
  hideLabel = false,
  name,
  id,
  startIcon,
  endIcon,
  clearable = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputId = id || `select-${useId()}`;
  // Find the selected option
  const selectedOption = options.find(option => option.value === value);
  // Toggle the dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  // Handle option selection
  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };
  // Clear the selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => prev < options.length - 1 ? prev + 1 : prev);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        // Handle typing to select an option
        const key = e.key.toLowerCase();
        const optionIndex = options.findIndex(option => option.label.toLowerCase().startsWith(key) && !option.disabled);
        if (optionIndex >= 0) {
          setHighlightedIndex(optionIndex);
          if (!isOpen) {
            setIsOpen(true);
          }
        }
        break;
    }
  };
  // Reset highlighted index when opening dropdown
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(option => option.value === value);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      // Scroll to highlighted option
      if (menuRef.current && selectedIndex >= 0) {
        const optionElement = menuRef.current.children[selectedIndex] as HTMLElement;
        if (optionElement) {
          optionElement.scrollIntoView({
            block: 'nearest'
          });
        }
      }
    }
  }, [isOpen, options, value]);
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-2 text-xs',
    md: 'py-2 px-3 text-sm',
    lg: 'py-2.5 px-4 text-base'
  };
  // Variant-specific styles
  const variantStyles = {
    outlined: `
        border border-gray-300 dark:border-gray-700 
        focus-within:border-green-500 dark:focus-within:border-green-500
        ${error ? 'border-red-500 dark:border-red-500' : ''}
        bg-white dark:bg-gray-800
      `,
    filled: `
        border border-transparent bg-gray-100 dark:bg-gray-800 
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus-within:bg-white dark:focus-within:bg-gray-900
        ${error ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500' : ''}
      `,
    underlined: `
        border-b-2 border-gray-300 dark:border-gray-700 rounded-none px-1
        focus-within:border-green-500 dark:focus-within:border-green-500
        ${error ? 'border-red-500 dark:border-red-500' : ''}
        bg-transparent
      `
  };
  return <div className={`
          ${fullWidth ? 'w-full' : 'inline-block'}
          ${className}
        `} {...props}>
        {/* Label */}
        {label && !hideLabel && <label htmlFor={inputId} className={`
              block text-sm font-medium mb-1.5
              ${disabled ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}
              ${error ? 'text-red-500 dark:text-red-400' : ''}
            `}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>}

        {/* Select container */}
        <div ref={selectRef} className={`
            relative
            ${fullWidth ? 'w-full' : ''}
          `}>
          {/* Select button */}
          <div ref={ref} id={inputId} role="combobox" aria-controls={`${inputId}-listbox`} aria-expanded={isOpen} aria-haspopup="listbox" aria-labelledby={label ? `${inputId}-label` : undefined} aria-required={required} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined} tabIndex={disabled ? -1 : 0} className={`
              flex items-center justify-between w-full rounded-md
              ${variantStyles[variant]}
              ${sizeClasses[size]}
              ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'cursor-pointer'}
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
            `} onClick={toggleDropdown} onKeyDown={handleKeyDown}>
            {/* Start icon */}
            {startIcon && <span className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                {startIcon}
              </span>}

            {/* Selected value or placeholder */}
            <span className={`
              flex-grow truncate text-left
              ${!selectedOption ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
            `}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            {/* Clear button */}
            {clearable && selectedOption && !disabled && <button type="button" className="ml-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={handleClear} aria-label="Clear selection">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>}

            {/* Custom end icon or default dropdown icon */}
            {endIcon ? <span className="ml-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                {endIcon}
              </span> : <ChevronDownIcon size={16} className={`
                  ml-2 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform duration-200
                  ${isOpen ? 'transform rotate-180' : ''}
                `} />}

            {/* Error icon */}
            {error && <AlertCircleIcon size={16} className="ml-2 text-red-500 dark:text-red-400 flex-shrink-0" />}
          </div>

          {/* Hidden native select for form submission */}
          {name && <select name={name} value={value} onChange={() => {}} disabled={disabled} required={required} className="sr-only" aria-hidden="true" tabIndex={-1}>
              <option value="" disabled={required}>
                {placeholder}
              </option>
              {options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>)}
            </select>}

          {/* Dropdown menu */}
          {isOpen && <FocusTrap isActive={isOpen} onEscape={() => setIsOpen(false)}>
              <div id={`${inputId}-listbox`} role="listbox" aria-labelledby={label ? `${inputId}-label` : undefined} className={`
                  absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 
                  rounded-md shadow-lg max-h-60 overflow-auto
                  border border-gray-200 dark:border-gray-700
                  ${menuClassName}
                  animate-in fade-in duration-200
                `} ref={menuRef}>
                {options.length === 0 ? <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No options available
                  </div> : options.map((option, index) => <div key={option.value} id={`${inputId}-option-${option.value}`} role="option" aria-selected={value === option.value} aria-disabled={option.disabled} className={`
                        px-3 py-2 cursor-pointer flex items-center
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        ${highlightedIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''}
                        ${value === option.value ? 'bg-green-50 dark:bg-green-900/20' : ''}
                      `} onClick={() => handleSelect(option)} onMouseEnter={() => setHighlightedIndex(index)}>
                      {/* Option icon */}
                      {option.icon && <span className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {option.icon}
                        </span>}

                      {/* Option content */}
                      <div className="flex-grow min-w-0">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {option.label}
                        </div>
                        {option.description && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {option.description}
                          </div>}
                      </div>

                      {/* Check icon for selected option */}
                      {value === option.value && <CheckIcon size={16} className="ml-2 text-green-500 dark:text-green-400 flex-shrink-0" />}
                    </div>)}
              </div>
            </FocusTrap>}
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
Select.displayName = 'Select';