import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { Portal, FocusTrap } from './AccessibilityUtils';
export interface DropdownItem {
  id: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  selected?: boolean;
  description?: string;
  divider?: boolean;
}
export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'end' | 'center';
  width?: number | string;
  maxHeight?: number | string;
  onSelect?: (item: DropdownItem) => void;
  closeOnSelect?: boolean;
  renderItem?: (item: DropdownItem) => React.ReactNode;
  className?: string;
  menuClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  sameWidth?: boolean;
  variant?: 'default' | 'ghost' | 'glass';
  showSelectedCheck?: boolean;
}
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'end',
  width = 'auto',
  maxHeight = 300,
  onSelect,
  closeOnSelect = true,
  renderItem,
  className = '',
  menuClassName = '',
  isOpen: controlledIsOpen,
  onOpenChange,
  sameWidth = false,
  variant = 'default',
  showSelectedCheck = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // Handle controlled/uncontrolled state
  const open = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  const handleOpenChange = (value: boolean) => {
    if (controlledIsOpen === undefined) {
      setIsOpen(value);
    }
    onOpenChange?.(value);
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onOpenChange]);
  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);
  // Set width of menu to match trigger if sameWidth is true
  useEffect(() => {
    if (open && sameWidth && triggerRef.current && menuRef.current) {
      menuRef.current.style.width = `${triggerRef.current.offsetWidth}px`;
    }
  }, [open, sameWidth]);
  // Toggle dropdown
  const toggleDropdown = () => {
    handleOpenChange(!open);
  };
  // Handle item selection
  const handleItemSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    if (item.onClick) {
      item.onClick();
    }
    if (onSelect) {
      onSelect(item);
    }
    if (closeOnSelect) {
      handleOpenChange(false);
    }
  };
  // Align classes
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };
  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
    ghost: 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg',
    glass: 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/10 dark:border-gray-700/30 shadow-xl'
  };
  // Custom render function for items
  const renderDropdownItem = (item: DropdownItem) => {
    if (renderItem) {
      return renderItem(item);
    }
    if (item.divider) {
      return <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />;
    }
    const itemContent = <div className="flex items-center w-full">
        {item.icon && <span className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
            {item.icon}
          </span>}
        <div className="flex-grow min-w-0">
          <div className="text-sm text-gray-700 dark:text-gray-200">
            {item.label}
          </div>
          {item.description && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {item.description}
            </div>}
        </div>
        {showSelectedCheck && item.selected && <CheckIcon size={16} className="ml-2 text-green-500 dark:text-green-400 flex-shrink-0" />}
      </div>;
    if (item.href) {
      return <a href={item.href} className={`
            flex items-center px-4 py-2 text-sm
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer'}
            ${item.selected ? 'bg-gray-50 dark:bg-gray-700/30' : ''}
          `} onClick={e => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }
        handleItemSelect(item);
      }}>
          {itemContent}
        </a>;
    }
    return <button type="button" className={`
          flex items-center px-4 py-2 text-sm w-full text-left
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer'}
          ${item.selected ? 'bg-gray-50 dark:bg-gray-700/30' : ''}
        `} disabled={item.disabled} onClick={() => handleItemSelect(item)}>
        {itemContent}
      </button>;
  };
  return <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Trigger element */}
      <div ref={triggerRef} onClick={toggleDropdown} className="inline-flex cursor-pointer" aria-haspopup="true" aria-expanded={open} role="button" tabIndex={0} onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    }}>
        {typeof trigger === 'string' ? <button className="inline-flex items-center justify-center">
            <span>{trigger}</span>
            <ChevronDownIcon size={16} className="ml-1" />
          </button> : trigger}
      </div>

      {/* Dropdown menu */}
      {open && <Portal>
          <FocusTrap isActive={open} onEscape={() => handleOpenChange(false)}>
            <div ref={menuRef} className={`
                absolute z-50 mt-2 rounded-lg overflow-hidden
                ${alignClasses[align]}
                ${variantClasses[variant]}
                ${menuClassName}
                animate-in fade-in duration-200
              `} style={{
          width: typeof width === 'number' ? `${width}px` : width,
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
        }} role="menu" aria-orientation="vertical">
              <div className="py-1 max-h-[inherit] overflow-auto">
                {items.map((item, index) => <div key={item.id || index} role="menuitem">
                    {renderDropdownItem(item)}
                  </div>)}
              </div>
            </div>
          </FocusTrap>
        </Portal>}
    </div>;
};