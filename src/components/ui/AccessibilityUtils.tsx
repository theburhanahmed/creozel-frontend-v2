import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// Focus Trap component for modals and dialogs
interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  onEscape?: () => void;
}
export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  isActive,
  onEscape
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    // Get all focusable elements
    const focusableElements = containerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    // Focus the first element when trap becomes active
    if (firstElement) {
      firstElement.focus();
    }
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle escape key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      // Handle tab key for cycling through focusable elements
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // If shift+tab and on first element, move to last element
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // If tab and on last element, move to first element
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Store previous active element to restore focus when trap is deactivated
    const previousActiveElement = document.activeElement as HTMLElement;
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when trap is deactivated
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isActive, onEscape]);
  return <div ref={containerRef}>{children}</div>;
};
// Portal component for rendering elements outside their parent hierarchy
interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}
export const Portal: React.FC<PortalProps> = ({
  children,
  container
}) => {
  const defaultContainer = typeof document !== 'undefined' ? document.body : null;
  const targetContainer = container || defaultContainer;
  return targetContainer ? createPortal(children, targetContainer) : null;
};
// Custom hook for keyboard navigation
type KeyHandler = (key: string, event: KeyboardEvent) => void;
export const useKeyboardNavigation = (ref: React.RefObject<HTMLElement>, handler: KeyHandler) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handler(event.key, event);
    };
    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => {
        element.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [ref, handler]);
};
// Skip link component for accessibility
interface SkipLinkProps {
  targetId: string;
  className?: string;
  label?: string;
}
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId,
  className = '',
  label = 'Skip to content'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.tabIndex = -1;
      target.focus();
      // Reset tabIndex after focus
      setTimeout(() => {
        if (target.tabIndex === -1) {
          target.tabIndex = 0;
        }
      }, 100);
    }
  };
  return <a href={`#${targetId}`} onClick={handleClick} className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:dark:bg-gray-800 focus:text-gray-900 focus:dark:text-white focus:rounded-md focus:shadow-lg focus:outline-none ${className}`}>
      {label}
    </a>;
};