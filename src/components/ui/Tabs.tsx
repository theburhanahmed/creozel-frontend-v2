import React, { useEffect, useState, useRef, Children, isValidElement } from 'react';
export interface TabProps {
  title: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
export const Tab: React.FC<TabProps> = ({
  children,
  className = ''
}) => {
  return <div className={`py-4 ${className}`}>{children}</div>;
};
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'pills' | 'underlined' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  animated?: boolean;
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
}
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
  tabsClassName = '',
  contentClassName = '',
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  animated = true,
  tabPosition = 'top'
}) => {
  // Extract tabs from children
  const tabs = Children.toArray(children).filter(child => isValidElement(child) && (child.type === Tab || child.props.value)) as React.ReactElement[];
  // Get default tab value
  const getInitialTab = () => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    if (tabs.length > 0) return tabs[0].props.value;
    return '';
  };
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>(getInitialTab());
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  // Update active tab when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);
  // Update indicator position when active tab changes
  useEffect(() => {
    updateIndicator();
  }, [activeTab, orientation, variant]);
  // Update indicator on resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, orientation, variant]);
  // Handle tab change
  const handleTabChange = (tabValue: string) => {
    if (value === undefined) {
      setActiveTab(tabValue);
    }
    if (onValueChange) {
      onValueChange(tabValue);
    }
  };
  // Update indicator position
  const updateIndicator = () => {
    if (variant !== 'default' && variant !== 'underlined') return;
    const activeTabElement = tabRefs.current.get(activeTab);
    if (!activeTabElement || !tabsRef.current) return;
    const tabsRect = tabsRef.current.getBoundingClientRect();
    const activeTabRect = activeTabElement.getBoundingClientRect();
    if (orientation === 'horizontal') {
      const left = activeTabRect.left - tabsRect.left;
      const width = activeTabRect.width;
      setIndicatorStyle({
        left,
        width,
        height: 2,
        transform: 'none'
      });
    } else {
      const top = activeTabRect.top - tabsRect.top;
      const height = activeTabRect.height;
      setIndicatorStyle({
        top,
        height,
        width: 2,
        transform: 'none'
      });
    }
  };
  // Register tab ref
  const registerTabRef = (value: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(value, element);
    } else {
      tabRefs.current.delete(value);
    }
  };
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  };
  // Variant classes
  const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = `
      flex items-center justify-center font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${sizeClasses[size]}
    `;
    switch (variant) {
      case 'pills':
        return `
          ${baseClasses}
          rounded-full
          ${isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
        `;
      case 'underlined':
        return `
          ${baseClasses}
          border-b-2 rounded-none px-1 mx-3 first:ml-0 last:mr-0
          ${isActive ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}
        `;
      case 'bordered':
        return `
          ${baseClasses}
          border-b
          ${isActive ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700'}
        `;
      default:
        return `
          ${baseClasses}
          ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}
        `;
    }
  };
  // Orientation classes
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };
  // Tab position classes
  const getLayoutClasses = () => {
    switch (tabPosition) {
      case 'bottom':
        return 'flex flex-col-reverse';
      case 'left':
        return 'flex flex-row';
      case 'right':
        return 'flex flex-row-reverse';
      default:
        return 'flex flex-col';
    }
  };
  return <div className={`${getLayoutClasses()} ${className}`}>
      {/* Tabs */}
      <div className={`
          relative flex ${orientationClasses[orientation]} 
          ${fullWidth && orientation === 'horizontal' ? 'w-full' : ''}
          ${variant === 'bordered' ? 'border-b border-gray-200 dark:border-gray-700' : ''}
          ${tabsClassName}
        `} ref={tabsRef} role="tablist" aria-orientation={orientation}>
        {tabs.map(tab => {
        const {
          value: tabValue,
          title,
          icon,
          disabled = false
        } = tab.props;
        const isActive = activeTab === tabValue;
        return <button key={tabValue} ref={el => registerTabRef(tabValue, el)} role="tab" aria-selected={isActive} aria-controls={`panel-${tabValue}`} id={`tab-${tabValue}`} tabIndex={isActive ? 0 : -1} className={`
                ${getTabClasses(isActive, disabled)}
                ${fullWidth && orientation === 'horizontal' ? 'flex-1' : ''}
              `} onClick={() => !disabled && handleTabChange(tabValue)} disabled={disabled}>
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </button>;
      })}
        {/* Active indicator */}
        {(variant === 'default' || variant === 'underlined') && <div className={`
              absolute bg-green-500 transition-all duration-300
              ${orientation === 'horizontal' ? 'bottom-0' : 'right-0'}
            `} style={indicatorStyle} />}
      </div>
      {/* Tab content */}
      <div className={`${contentClassName}`}>
        {tabs.map(tab => {
        const {
          value: tabValue,
          children
        } = tab.props;
        const isActive = activeTab === tabValue;
        return <div key={tabValue} role="tabpanel" id={`panel-${tabValue}`} aria-labelledby={`tab-${tabValue}`} hidden={!isActive} className={`
                ${animated ? 'transition-opacity duration-300' : ''}
                ${isActive ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}
              `}>
              {isActive && children}
            </div>;
      })}
      </div>
    </div>;
};