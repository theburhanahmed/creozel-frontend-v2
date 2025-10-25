import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Portal } from './AccessibilityUtils';
interface TooltipProps {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  children?: React.ReactNode;
  className?: string;
  // For fixed positioning (used by the ContentEngineOrb)
  visible?: boolean;
  x?: number;
  y?: number;
}
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  delay = 300,
  children,
  className,
  visible: controlledVisible,
  x,
  y
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({
    x: 0,
    y: 0
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Handle controlled visibility mode (for fixed positioning)
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setVisible(controlledVisible);
      if (x !== undefined && y !== undefined) {
        setCoords({
          x,
          y
        });
      }
    }
  }, [controlledVisible, x, y]);
  // Handle mouse events for standard tooltip behavior
  const handleMouseEnter = () => {
    if (controlledVisible !== undefined) return; // Skip if controlled
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setCoords({
          x: centerX,
          y: position === 'bottom' ? rect.bottom + window.scrollY : rect.top + window.scrollY
        });
      }
    }, delay);
  };
  const handleMouseLeave = () => {
    if (controlledVisible !== undefined) return; // Skip if controlled
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };
  // Calculate tooltip position
  useEffect(() => {
    if (!visible || !tooltipRef.current) return;
    // Skip positioning if using fixed coordinates
    if (controlledVisible !== undefined && x !== undefined && y !== undefined) return;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const offset = 8; // Distance from the trigger element
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      let x = 0;
      let y = 0;
      switch (position) {
        case 'top':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - offset + window.scrollY;
          break;
        case 'right':
          x = triggerRect.right + offset;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          break;
        case 'bottom':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + offset + window.scrollY;
          break;
        case 'left':
          x = triggerRect.left - tooltipRect.width - offset;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          break;
      }
      // Ensure tooltip stays within viewport
      const padding = 10;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      if (x < padding) x = padding;
      if (y < padding + window.scrollY) y = padding + window.scrollY;
      if (x + tooltipRect.width > viewportWidth - padding) {
        x = viewportWidth - tooltipRect.width - padding;
      }
      if (y + tooltipRect.height > viewportHeight + window.scrollY - padding) {
        y = viewportHeight + window.scrollY - tooltipRect.height - padding;
      }
      setCoords({
        x,
        y
      });
    }
  }, [visible, position, controlledVisible, x, y]);
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  // Animation classes based on position
  const getAnimationClasses = () => {
    const baseClasses = 'animate-in fade-in duration-200';
    switch (position) {
      case 'top':
        return `${baseClasses} slide-in-from-bottom-2`;
      case 'right':
        return `${baseClasses} slide-in-from-left-2`;
      case 'bottom':
        return `${baseClasses} slide-in-from-top-2`;
      case 'left':
        return `${baseClasses} slide-in-from-right-2`;
      default:
        return baseClasses;
    }
  };
  return <>
      {children && <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave} className="inline-block">
          {children}
        </div>}
      {visible && <Portal>
          <div ref={tooltipRef} role="tooltip" className={cn('fixed z-50 max-w-xs px-3 py-1.5 text-sm rounded-md shadow-md', 'bg-gray-900 text-white dark:bg-gray-800', 'pointer-events-none', getAnimationClasses(), className)} style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
        transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : position === 'left' ? 'translateY(-50%)' : position === 'right' ? 'translateY(-50%)' : 'none'
      }}>
            {text}
          </div>
        </Portal>}
    </>;
};