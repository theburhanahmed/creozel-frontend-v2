import React, { useEffect, useState, useRef, Children, useId, cloneElement, isValidElement } from 'react';
import { ChevronDownIcon } from 'lucide-react';
export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  id?: string;
  onToggle?: (isOpen: boolean) => void;
}
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  icon,
  className = '',
  titleClassName = '',
  contentClassName = '',
  id,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);
  const itemId = id || `accordion-item-${useId()}`;
  const contentId = `${itemId}-content`;
  const headerId = `${itemId}-header`;
  // Update content height when isOpen changes
  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      // After animation completes, set height to auto to handle content changes
      const timer = setTimeout(() => {
        setContentHeight('auto');
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // First set a fixed height to enable animation
      if (contentHeight === 'auto') {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
        // Force a reflow before setting height to 0
        contentRef.current.offsetHeight;
      }
      setContentHeight(0);
    }
  }, [isOpen]);
  // Handle resize to update content height if open
  useEffect(() => {
    if (!isOpen || contentHeight !== 'auto' || !contentRef.current) return;
    const handleResize = () => {
      if (contentRef.current && contentHeight === 'auto') {
        // No need to update if it's already auto
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, contentHeight]);
  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };
  return <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <h3>
        <button id={headerId} aria-expanded={isOpen} aria-controls={contentId} className={`
            flex justify-between items-center w-full py-4 px-5 text-left
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'}
            ${titleClassName}
          `} onClick={handleToggle} disabled={disabled}>
          <div className="flex items-center">
            {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {title}
            </span>
          </div>
          <ChevronDownIcon className={`
              flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400
              transition-transform duration-300
              ${isOpen ? 'transform rotate-180' : ''}
            `} />
        </button>
      </h3>
      <div id={contentId} role="region" aria-labelledby={headerId} ref={contentRef} className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{
      height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`
    }}>
        <div className={`pb-4 px-5 ${contentClassName}`}>{children}</div>
      </div>
    </div>;
};
export interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  className?: string;
  variant?: 'default' | 'bordered' | 'separated';
}
export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'multiple',
  defaultValue,
  value,
  onChange,
  collapsible = true,
  className = '',
  variant = 'default'
}) => {
  // Controlled or uncontrolled state
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });
  // Handle controlled state
  const isControlled = value !== undefined;
  const currentValue = isControlled ? Array.isArray(value) ? value : [value] : openItems;
  // Handle item toggle
  const handleItemToggle = (itemValue: string, isOpen: boolean) => {
    let newValue: string[];
    if (type === 'single') {
      newValue = isOpen ? [itemValue] : collapsible ? [] : [itemValue];
    } else {
      if (isOpen) {
        newValue = [...currentValue, itemValue];
      } else {
        newValue = currentValue.filter(v => v !== itemValue);
      }
    }
    if (!isControlled) {
      setOpenItems(newValue);
    }
    if (onChange) {
      onChange(type === 'single' ? newValue[0] || '' : newValue);
    }
  };
  // Variant styles
  const variantStyles = {
    default: 'divide-y divide-gray-200 dark:divide-gray-700',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
    separated: 'space-y-2'
  };
  // Clone children with additional props
  const accordionItems = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const itemValue = child.props.id || `item-${index}`;
      const isOpen = currentValue.includes(itemValue);
      return cloneElement(child, {
        id: itemValue,
        defaultOpen: isOpen,
        onToggle: (open: boolean) => handleItemToggle(itemValue, open),
        className: variant === 'separated' ? `${child.props.className || ''} border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden` : child.props.className
      });
    }
    return child;
  });
  return <div className={`${variantStyles[variant]} ${className}`}>
      {accordionItems}
    </div>;
};