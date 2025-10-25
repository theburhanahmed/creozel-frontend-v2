import React, { useEffect, useState, useRef } from 'react';
import { Portal } from './AccessibilityUtils';
export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  offset?: number;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  arrow?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  triggerType?: 'click' | 'hover' | 'manual';
  openDelay?: number;
  closeDelay?: number;
  portal?: boolean;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
}
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  offset = 8,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  arrow = true,
  interactive = true,
  disabled = false,
  triggerType = 'click',
  openDelay = 0,
  closeDelay = 0,
  portal = true,
  sideOffset = 0,
  align = 'center',
  alignOffset = 0
}) => {
  // State for uncontrolled popover
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  // Determine if controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  // Refs for DOM elements
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  // Refs for timers
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Calculate positions
  const [popoverStyles, setPopoverStyles] = useState({
    top: 0,
    left: 0,
    arrowTop: 0,
    arrowLeft: 0,
    transformOrigin: ''
  });
  // Handle controlled state changes
  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(open);
    }
    onOpenChange?.(open);
  };
  // Open popover with delay
  const openPopover = () => {
    if (disabled) return;
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    if (openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => {
        handleOpenChange(true);
      }, openDelay);
    } else {
      handleOpenChange(true);
    }
  };
  // Close popover with delay
  const closePopover = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    if (closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => {
        handleOpenChange(false);
      }, closeDelay);
    } else {
      handleOpenChange(false);
    }
  };
  // Toggle popover
  const togglePopover = () => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };
  // Determine event handlers based on trigger type
  const getTriggerEvents = () => {
    if (triggerType === 'manual' || disabled) return {};
    if (triggerType === 'hover') {
      return {
        onMouseEnter: openPopover,
        onMouseLeave: closePopover,
        onFocus: openPopover,
        onBlur: closePopover
      };
    }
    return {
      onClick: togglePopover
    };
  };
  // Calculate popover position
  const updatePosition = () => {
    if (!isOpen || !triggerRef.current || !contentRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const arrowSize = arrow ? 8 : 0; // Arrow height
    // Base positions
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    let transformOrigin = '';
    // Calculate position based on alignment
    const getAlignedPosition = (baseLeft: number) => {
      switch (align) {
        case 'start':
          return baseLeft + alignOffset;
        case 'end':
          return baseLeft - (contentRect.width - triggerRect.width) - alignOffset;
        default:
          // center
          return baseLeft - (contentRect.width - triggerRect.width) / 2;
      }
    };
    // Calculate position based on specified position
    switch (position) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top - contentRect.height - offset - arrowSize;
        left = getAlignedPosition(triggerRect.left);
        arrowTop = contentRect.height;
        arrowLeft = position === 'top-start' ? Math.min(triggerRect.width / 2, 20) : position === 'top-end' ? contentRect.width - Math.min(triggerRect.width / 2, 20) : contentRect.width / 2;
        transformOrigin = 'bottom center';
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + offset + arrowSize;
        left = getAlignedPosition(triggerRect.left);
        arrowTop = -arrowSize;
        arrowLeft = position === 'bottom-start' ? Math.min(triggerRect.width / 2, 20) : position === 'bottom-end' ? contentRect.width - Math.min(triggerRect.width / 2, 20) : contentRect.width / 2;
        transformOrigin = 'top center';
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        top = position === 'left-start' ? triggerRect.top + sideOffset : position === 'left-end' ? triggerRect.bottom - contentRect.height - sideOffset : triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - offset - arrowSize;
        arrowTop = position === 'left-start' ? Math.min(triggerRect.height / 2, 20) : position === 'left-end' ? contentRect.height - Math.min(triggerRect.height / 2, 20) : contentRect.height / 2;
        arrowLeft = contentRect.width;
        transformOrigin = 'right center';
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        top = position === 'right-start' ? triggerRect.top + sideOffset : position === 'right-end' ? triggerRect.bottom - contentRect.height - sideOffset : triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + offset + arrowSize;
        arrowTop = position === 'right-start' ? Math.min(triggerRect.height / 2, 20) : position === 'right-end' ? contentRect.height - Math.min(triggerRect.height / 2, 20) : contentRect.height / 2;
        arrowLeft = -arrowSize;
        transformOrigin = 'left center';
        break;
    }
    // Adjust for window boundaries
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const padding = 8;
    if (left < padding) {
      left = padding;
    } else if (left + contentRect.width > windowWidth - padding) {
      left = windowWidth - contentRect.width - padding;
    }
    if (top < padding) {
      top = padding;
    } else if (top + contentRect.height > windowHeight - padding) {
      top = windowHeight - contentRect.height - padding;
    }
    // Account for scroll
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setPopoverStyles({
      top: top + scrollY,
      left: left + scrollX,
      arrowTop,
      arrowLeft,
      transformOrigin
    });
  };
  // Update position when popover opens or window resizes
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);
  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!triggerRef.current?.contains(event.target as Node) && !contentRef.current?.contains(event.target as Node)) {
        closePopover();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, closeOnEscape]);
  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);
  // Render arrow based on position
  const renderArrow = () => {
    if (!arrow) return null;
    return <div ref={arrowRef} className="absolute w-0 h-0 border-transparent" style={{
      top: popoverStyles.arrowTop,
      left: popoverStyles.arrowLeft,
      borderWidth: '8px',
      ...(position.startsWith('top') && {
        borderTopColor: 'currentColor',
        transform: 'translateX(-50%)'
      }),
      ...(position.startsWith('bottom') && {
        borderBottomColor: 'currentColor',
        transform: 'translateX(-50%)'
      }),
      ...(position.startsWith('left') && {
        borderLeftColor: 'currentColor',
        transform: 'translateY(-50%)'
      }),
      ...(position.startsWith('right') && {
        borderRightColor: 'currentColor',
        transform: 'translateY(-50%)'
      })
    }} />;
  };
  // Render content
  const renderContent = () => {
    if (!isOpen) return null;
    const popoverContent = <div ref={contentRef} role="tooltip" className={`
          absolute z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          shadow-lg rounded-md border border-gray-200 dark:border-gray-700
          p-4 min-w-[8rem] max-w-sm
          animate-in fade-in zoom-in-95 duration-200
          ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}
          ${contentClassName}
        `} style={{
      top: popoverStyles.top,
      left: popoverStyles.left,
      transformOrigin: popoverStyles.transformOrigin
    }} onMouseEnter={triggerType === 'hover' && interactive ? openPopover : undefined} onMouseLeave={triggerType === 'hover' && interactive ? closePopover : undefined}>
        {content}
        {renderArrow()}
      </div>;
    return portal ? <Portal>{popoverContent}</Portal> : popoverContent;
  };
  return <div className={`inline-block ${className}`}>
      <div ref={triggerRef} className={`inline-block ${triggerClassName} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`} {...getTriggerEvents()} aria-expanded={isOpen}>
        {trigger}
      </div>
      {renderContent()}
    </div>;
};